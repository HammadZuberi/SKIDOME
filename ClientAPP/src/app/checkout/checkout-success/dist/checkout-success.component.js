"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutSuccessComponent = void 0;
var core_1 = require("@angular/core");
var CheckoutSuccessComponent = /** @class */ (function () {
    function CheckoutSuccessComponent(router) {
        var _a;
        this.router = router;
        var nav = this.router.getCurrentNavigation();
        this.order = (_a = nav === null || nav === void 0 ? void 0 : nav.extras) === null || _a === void 0 ? void 0 : _a.state;
    }
    // constructor(private router: Router) {
    //   console.log(this.router.getCurrentNavigation().extras.state.example); // should log out 'bar'
    // }
    CheckoutSuccessComponent.prototype.viewCustomerOrder = function () {
        var _a;
        var nav = this.router.getCurrentNavigation();
        this.order = (_a = nav === null || nav === void 0 ? void 0 : nav.extras) === null || _a === void 0 ? void 0 : _a.state;
        // if (this.order) {
        //   const NavigationExtras: NavigationExtras = { state: order };
        //   this.router.navigate(['order/details/' + order]);
        // } else {
        //   console.log('order not found');
        // }
    };
    CheckoutSuccessComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout-success',
            templateUrl: './checkout-success.component.html',
            styleUrls: ['./checkout-success.component.scss']
        })
    ], CheckoutSuccessComponent);
    return CheckoutSuccessComponent;
}());
exports.CheckoutSuccessComponent = CheckoutSuccessComponent;
