"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutReviewComponent = void 0;
var core_1 = require("@angular/core");
var CheckoutReviewComponent = /** @class */ (function () {
    function CheckoutReviewComponent(basketService, toastr) {
        this.basketService = basketService;
        this.toastr = toastr;
    }
    CheckoutReviewComponent.prototype.createPaymentIntent = function () {
        var _this = this;
        this.basketService.createPaymentIntent().subscribe({
            next: function () { return _this.toastr.success('Payment intent created'); },
            error: function (err) { return _this.toastr.error(err.message); }
        });
    };
    CheckoutReviewComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout-review',
            templateUrl: './checkout-review.component.html',
            styleUrls: ['./checkout-review.component.scss']
        })
    ], CheckoutReviewComponent);
    return CheckoutReviewComponent;
}());
exports.CheckoutReviewComponent = CheckoutReviewComponent;
