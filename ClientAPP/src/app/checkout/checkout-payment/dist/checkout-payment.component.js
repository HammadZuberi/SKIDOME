"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CheckoutPaymentComponent = void 0;
var core_1 = require("@angular/core");
var stripe_js_1 = require("@stripe/stripe-js");
var rxjs_1 = require("rxjs");
var CheckoutPaymentComponent = /** @class */ (function () {
    function CheckoutPaymentComponent(basketService, checkoutService, toastr, router) {
        this.basketService = basketService;
        this.checkoutService = checkoutService;
        this.toastr = toastr;
        this.router = router;
        this.stripe = null;
        this.loading = false;
        this.cardExpiryComplte = false;
        this.cardNumberComplte = false;
        this.cardCvcComplte = false;
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
                    _this.cardNumberComplte = event.complete;
                    if (event.error)
                        _this.cardErrors = event.error.message;
                    else
                        _this.cardErrors = null;
                });
                _this.cardExpiry = elements.create('cardExpiry');
                _this.cardExpiry.mount((_b = _this.cardExpiryElement) === null || _b === void 0 ? void 0 : _b.nativeElement);
                _this.cardExpiry.on('change', function (event) {
                    _this.cardExpiryComplte = event.complete;
                    if (event.error) {
                        _this.cardErrors = event.error.message;
                        console.log(event.error.message);
                    }
                    else
                        _this.cardErrors = null;
                });
                _this.cardCvc = elements.create('cardCvc');
                _this.cardCvc.mount((_c = _this.cardCvcElement) === null || _c === void 0 ? void 0 : _c.nativeElement);
                _this.cardCvc.on('change', function (event) {
                    _this.cardCvcComplte = event.complete;
                    if (event.error)
                        _this.cardErrors = event.error.message;
                    else
                        _this.cardErrors = null;
                });
            }
        });
    };
    Object.defineProperty(CheckoutPaymentComponent.prototype, "PaymentFormComplete", {
        get: function () {
            var _a, _b;
            return (((_b = (_a = this.checkoutForm) === null || _a === void 0 ? void 0 : _a.get('paymentForm')) === null || _b === void 0 ? void 0 : _b.valid) &&
                this.cardCvcComplte &&
                this.cardExpiryComplte &&
                this.cardNumberComplte);
        },
        enumerable: false,
        configurable: true
    });
    CheckoutPaymentComponent.prototype.submitOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var basket, createOrder, paymentResult, NavigationExtras, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        basket = this.basketService.getCurrentBasketValue();
                        if (!basket)
                            throw new Error('can not find basket');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.createOrder(basket)];
                    case 2:
                        createOrder = _a.sent();
                        return [4 /*yield*/, this.confirmPaymentStripe(basket)];
                    case 3:
                        paymentResult = _a.sent();
                        if (paymentResult.paymentIntent) {
                            // this.basketService.deleteLocalBasket();
                            this.basketService.deleteBasket(basket);
                            //delete form local storage application storage,
                            console.log(createOrder);
                            NavigationExtras = { state: createOrder };
                            this.router.navigate(['checkout/success'], NavigationExtras);
                        }
                        else {
                            this.toastr.error(paymentResult.error.message);
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.toastr.error(error_1.message);
                        return [3 /*break*/, 6];
                    case 5:
                        this.loading = false;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CheckoutPaymentComponent.prototype.confirmPaymentStripe = function (basket) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var resultStripe;
            return __generator(this, function (_e) {
                if (!basket)
                    throw new Error('Basket is null');
                resultStripe = (_a = this.stripe) === null || _a === void 0 ? void 0 : _a.confirmCardPayment(basket.clientSecret, {
                    payment_method: {
                        card: this.cardNumber,
                        billing_details: {
                            name: (_d = (_c = (_b = this.checkoutForm) === null || _b === void 0 ? void 0 : _b.get('paymentForm')) === null || _c === void 0 ? void 0 : _c.get('nameOnCard')) === null || _d === void 0 ? void 0 : _d.value
                        }
                    }
                });
                if (!resultStripe)
                    throw new Error('problem attempting Payment with Stripe');
                this.toastr.success('Order created successfully');
                return [2 /*return*/, resultStripe];
            });
        });
    };
    //garantee to return promise
    CheckoutPaymentComponent.prototype.createOrder = function (basket) {
        return __awaiter(this, void 0, void 0, function () {
            var ordertoCreate;
            return __generator(this, function (_a) {
                if (!basket)
                    throw new Error('Basket is null');
                ordertoCreate = this.getOrderToCreate(basket);
                return [2 /*return*/, rxjs_1.firstValueFrom(this.checkoutService.CreateOrder(ordertoCreate))];
            });
        });
    };
    CheckoutPaymentComponent.prototype.getOrderToCreate = function (basket) {
        var _a, _b, _c, _d, _e;
        var DeliveryMethodId = (_c = (_b = (_a = this.checkoutForm) === null || _a === void 0 ? void 0 : _a.get('deliveryForm')) === null || _b === void 0 ? void 0 : _b.get('deliveryMethod')) === null || _c === void 0 ? void 0 : _c.value;
        var ShipToAddress = (_e = (_d = this.checkoutForm) === null || _d === void 0 ? void 0 : _d.get('addressForm')) === null || _e === void 0 ? void 0 : _e.value;
        if (!DeliveryMethodId || !ShipToAddress)
            throw new Error('Problem with Basket');
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
// if (!basket) return;
// const OrdertoCreate = this.getOrderToCreate(basket);
// if (!OrdertoCreate) return;
// create a promise instead of subcribing and creating /holding an observable.
// this.checkoutService.CreateOrder(OrdertoCreate).subscribe({
//   next: (order) => {
//     this.toastr.success('ORder created successfully');
//     this.stripe
//       ?.confirmCardPayment(basket.clientSecret!, {
//         payment_method: {
//           card: this.cardNumber!,
//           billing_details: {
//             name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')
//               ?.value,
//           },
//         },
//       })
//       .then((result) => {
//         console.log(result);
//         if (result.paymentIntent) {
//           this.basketService.deleteLocalBasket();
//           //delete form local storage application storage,
//           console.log(order);
//           const NavigationExtras: NavigationExtras = { state: order };
//           this.router.navigate(['checkout/success'], NavigationExtras);
//         } else {
//           this.toastr.error(result.error.message);
//         }
//       });
//   },
// });
