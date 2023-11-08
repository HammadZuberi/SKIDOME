"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutAddressComponent = void 0;
var core_1 = require("@angular/core");
var CheckoutAddressComponent = /** @class */ (function () {
    function CheckoutAddressComponent(accountService, toastr) {
        this.accountService = accountService;
        this.toastr = toastr;
    }
    CheckoutAddressComponent.prototype.saveUserAddress = function () {
        var _this = this;
        var _a;
        var Adform = (_a = this.checkoutForm) === null || _a === void 0 ? void 0 : _a.get('addressForm');
        this.accountService.updateUserAddress(Adform === null || Adform === void 0 ? void 0 : Adform.value).subscribe({
            next: function () {
                _this.toastr.success('Address Saved'), 
                // this.checkoutForm?.get('addressForm')?.reset() reset to default
                Adform === null || 
                // this.checkoutForm?.get('addressForm')?.reset() reset to default
                Adform === void 0 ? void 0 : 
                // this.checkoutForm?.get('addressForm')?.reset() reset to default
                Adform.reset(Adform === null || Adform === void 0 ? void 0 : Adform.value);
            }
        });
    };
    __decorate([
        core_1.Input()
    ], CheckoutAddressComponent.prototype, "checkoutForm");
    CheckoutAddressComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout-address',
            templateUrl: './checkout-address.component.html',
            styleUrls: ['./checkout-address.component.scss']
        })
    ], CheckoutAddressComponent);
    return CheckoutAddressComponent;
}());
exports.CheckoutAddressComponent = CheckoutAddressComponent;
