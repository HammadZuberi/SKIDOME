"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasketService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_development_1 = require("src/environments/environment.development");
var Basket_1 = require("../shared/Models/Basket");
var BasketService = /** @class */ (function () {
    //update the observable and use in the required component
    function BasketService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = environment_development_1.environment.apiUrl;
        //initialize to null creating as observable and as service is a singleton so the informaation stays  alive until application is diposed off
        this.basketSource = new rxjs_1.BehaviorSubject(null);
        this.basketSource$ = this.basketSource.asObservable();
        //making total an observable so any component can subscribe to it
        this.basketTotalSource = new rxjs_1.BehaviorSubject(null);
        this.basketTotalSource$ = this.basketTotalSource.asObservable();
        this.shipingPrice = 0;
    }
    BasketService.prototype.setShipingPrice = function (deliveryMethod) {
        var basket = this.getCurrentBasketValue();
        // this.shipingPrice = deliveryMethod.price;
        if (basket) {
            basket.shippingPrice = deliveryMethod.price;
            basket.deliveryMethodId = deliveryMethod.id;
            //setting on Redis
            this.setBasket(basket);
        }
        // this.calculateTotal(); in the set basket
    };
    BasketService.prototype.createPaymentIntent = function () {
        var _this = this;
        var _a;
        return this.httpClient
            .post(this.baseUrl + 'payments/' + ((_a = this.getCurrentBasketValue()) === null || _a === void 0 ? void 0 : _a.id), {})
            .pipe(rxjs_1.map(function (basket) {
            _this.basketSource.next(basket);
            console.log(basket);
        }));
    };
    BasketService.prototype.getBasket = function (id) {
        var _this = this;
        return this.httpClient
            .get(this.baseUrl + 'basket?id=' + id)
            .subscribe({
            next: function (basket) {
                _this.basketSource.next(basket);
                _this.calculateTotal();
            },
            error: function (e) { return console.log(e); }
        });
    };
    BasketService.prototype.setBasket = function (basket) {
        var _this = this;
        return this.httpClient
            .post(this.baseUrl + 'basket', basket)
            .subscribe({
            next: function (basket) {
                _this.basketSource.next(basket);
                _this.calculateTotal();
            },
            error: function (e) { return console.log(e); }
        });
    };
    BasketService.prototype.getCurrentBasketValue = function () {
        //value of basket
        return this.basketSource.value;
    };
    BasketService.prototype.addItemToBasket = function (item, quantity) {
        var _a;
        if (quantity === void 0) { quantity = 1; }
        // const itemToAdd = this.MapProductToBasketItem(item);
        if (this.isProduct(item))
            item = this.MapProductToBasketItem(item);
        //?? is null
        var basket = (_a = this.getCurrentBasketValue()) !== null && _a !== void 0 ? _a : this.createBasket();
        basket.items = this.addOrUpdateItem(basket.items, item, quantity);
        this.setBasket(basket);
    };
    BasketService.prototype.removeItemFromBasket = function (id, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var basket = this.getCurrentBasketValue();
        if (!basket)
            return null;
        var item = basket.items.find(function (x) { return x.id === id; });
        if (item) {
            //remove 1 quantity
            item.quantity -= quantity;
            if (item.quantity === 0) {
                //check the id given is not found in the remaining basket
                basket.items = basket.items.filter(function (x) { return x.id !== id; });
            }
            if (basket.items.length > 0) {
                //update if it has something
                this.setBasket(basket);
            }
            else
                this.deleteBasket(basket);
        }
        return basket;
    };
    BasketService.prototype.deleteBasket = function (basket) {
        var _this = this;
        return this.httpClient["delete"](this.baseUrl + 'basket?id=' + basket.id)
            .subscribe({
            //empty basket and it sources
            next: function () {
                _this.deleteLocalBasket();
            }
        });
    };
    BasketService.prototype.deleteLocalBasket = function () {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('Basket_Id');
    };
    BasketService.prototype.addOrUpdateItem = function (items, itemToAdd, quantity) {
        //  if  basket items matches the item to add product or create  new item count
        var item = items.find(function (x) { return x.id === itemToAdd.id; });
        if (item) {
            item.quantity += quantity;
        }
        else {
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }
        return items;
    };
    BasketService.prototype.createBasket = function () {
        var basket = new Basket_1.Basket();
        localStorage.setItem('Basket_id', basket.id);
        return basket;
    };
    BasketService.prototype.MapProductToBasketItem = function (item) {
        return {
            id: item.id,
            productName: item.name,
            pictureUrl: item.pictureUrl,
            price: item.price,
            quantity: 0,
            type: item.productType,
            brand: item.productBrand
        };
    };
    //whenever you get or set a basket update value
    BasketService.prototype.calculateTotal = function () {
        var basket = this.getCurrentBasketValue();
        if (!basket)
            return null;
        // const shippingPrice = 0;
        var subTotal = basket.items.reduce(function (sum, item) { return item.price * item.quantity + sum; }, 0);
        // console.log(shippingPrice,subTotal);
        //refers to the class property
        var total = subTotal + basket.shippingPrice;
        return this.basketTotalSource.next({
            shippingPrice: basket.shippingPrice,
            subTotal: subTotal,
            total: total
        });
    };
    BasketService.prototype.isProduct = function (item) {
        //using Type Guard
        return item.productBrand !== undefined;
    };
    BasketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BasketService);
    return BasketService;
}());
exports.BasketService = BasketService;
