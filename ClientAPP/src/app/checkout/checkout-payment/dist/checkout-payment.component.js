"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutPaymentComponent = void 0;
var core_1 = require("@angular/core");
var stripe_js_1 = require("@stripe/stripe-js");
var CheckoutPaymentComponent = /** @class */ (function () {
    function CheckoutPaymentComponent(basketService, checkoutService, toastr, router) {
        this.basketService = basketService;
        this.checkoutService = checkoutService;
        this.toastr = toastr;
        this.router = router;
        this.stripe = null;
    }
    //laod stripe
    CheckoutPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        //publish key
        stripe_js_1.loadStripe('pk_test_51OcIyAChqXGeDg7By9DTylUDHQ6SPzHpooYhKvla015yKHqzfwSPxzE7g0vln19pmWDZLHFiQL87W4sRxx1qdWk300N6ngbhte').then(function (stripe) {
            var _a, _b, _c;
            _this.stripe = stripe;
            var elements = stripe === null || stripe === void 0 ? void 0 : stripe.elements();
            if (elements) {
                _this.cardNumber = elements.create('cardNumber');
                _this.cardNumber.mount((_a = _this.cardNumberElement) === null || _a === void 0 ? void 0 : _a.nativeElement);
                _this.cardNumber.on('change', function (event) {
                    if (event.error)
                        _this.cardErrors = event.error.message;
                    else
                        _this.cardErrors = null;
                });
                _this.cardExpiry = elements.create('cardExpiry');
                _this.cardExpiry.mount((_b = _this.cardExpiryElement) === null || _b === void 0 ? void 0 : _b.nativeElement);
                _this.cardExpiry.on('change', function (event) {
                    if (event.error)
                        _this.cardErrors = event.error.message;
                    else
                        _this.cardErrors = null;
                });
                _this.cardCvc = elements.create('cardCvc');
                _this.cardCvc.mount((_c = _this.cardCvcElement) === null || _c === void 0 ? void 0 : _c.nativeElement);
                _this.cardCvc.on('change', function (event) {
                    if (event.error)
                        _this.cardErrors = event.error.message;
                    else
                        _this.cardErrors = null;
                });
            }
        });
    };
    CheckoutPaymentComponent.prototype.submitOrder = function () {
        var _this = this;
        var basket = this.basketService.getCurrentBasketValue();
        if (!basket)
            return;
        var OrdertoCreate = this.getOrderToCreate(basket);
        if (!OrdertoCreate)
            return;
        this.checkoutService.CreateOrder(OrdertoCreate).subscribe({
            next: function (order) {
                _this.toastr.success('ORder created successfully');
                _this.basketService.deleteLocalBasket();
                //delete form local storage application storage,
                console.log(order);
                var NavigationExtras = { state: order };
                _this.router.navigate(['checkout/success'], NavigationExtras);
            }
        });
    };
    CheckoutPaymentComponent.prototype.getOrderToCreate = function (basket) {
        var _a, _b, _c, _d, _e;
        var DeliveryMethodId = (_c = (_b = (_a = this.checkoutForm) === null || _a === void 0 ? void 0 : _a.get('deliveryForm')) === null || _b === void 0 ? void 0 : _b.get('deliveryMethod')) === null || _c === void 0 ? void 0 : _c.value;
        var ShipToAddress = (_e = (_d = this.checkoutForm) === null || _d === void 0 ? void 0 : _d.get('addressForm')) === null || _e === void 0 ? void 0 : _e.value;
        if (!DeliveryMethodId || !ShipToAddress)
            return;
        return {
            basketId: basket.id,
            DeliveryMethodId: DeliveryMethodId,
            ShipToAddress: ShipToAddress
        };
    };
    __decorate([
        core_1.Input()
    ], CheckoutPaymentComponent.prototype, "checkoutForm");
    __decorate([
        core_1.ViewChild('cardNumber')
    ], CheckoutPaymentComponent.prototype, "cardNumberElement");
    __decorate([
        core_1.ViewChild('cardExpiry')
    ], CheckoutPaymentComponent.prototype, "cardExpiryElement");
    __decorate([
        core_1.ViewChild('cardCvc')
    ], CheckoutPaymentComponent.prototype, "cardCvcElement");
    CheckoutPaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout-payment',
            templateUrl: './checkout-payment.component.html',
            styleUrls: ['./checkout-payment.component.scss']
        })
    ], CheckoutPaymentComponent);
    return CheckoutPaymentComponent;
}());
exports.CheckoutPaymentComponent = CheckoutPaymentComponent;
