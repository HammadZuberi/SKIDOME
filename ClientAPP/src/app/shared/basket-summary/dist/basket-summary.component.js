"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasketSummaryComponent = void 0;
var core_1 = require("@angular/core");
var BasketSummaryComponent = /** @class */ (function () {
    //to use in html
    function BasketSummaryComponent(basketService) {
        this.basketService = basketService;
        this.addItem = new core_1.EventEmitter();
        this.removeItem = new core_1.EventEmitter();
        this.isBasket = true;
    }
    BasketSummaryComponent.prototype.addBasketItem = function (item) {
        this.addItem.emit(item);
    };
    BasketSummaryComponent.prototype.removeBasketItem = function (id, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.removeItem.emit({ id: id, quantity: quantity });
    };
    __decorate([
        core_1.Output()
    ], BasketSummaryComponent.prototype, "addItem");
    __decorate([
        core_1.Output()
    ], BasketSummaryComponent.prototype, "removeItem");
    __decorate([
        core_1.Input()
    ], BasketSummaryComponent.prototype, "isBasket");
    BasketSummaryComponent = __decorate([
        core_1.Component({
            selector: 'app-basket-summary',
            templateUrl: './basket-summary.component.html',
            styleUrls: ['./basket-summary.component.scss']
        })
    ], BasketSummaryComponent);
    return BasketSummaryComponent;
}());
exports.BasketSummaryComponent = BasketSummaryComponent;
