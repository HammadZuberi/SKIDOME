"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasketComponent = void 0;
var core_1 = require("@angular/core");
var BasketComponent = /** @class */ (function () {
    function BasketComponent(basketService) {
        this.basketService = basketService;
    }
    BasketComponent.prototype.increamentItem = function (item) {
        this.basketService.addItemToBasket(item);
    };
    // removeItem(id:number,quantity:number){
    //   this.basketService.removeItemFromBasket(id,quantity);
    // } done for event emmiter use as a single object
    BasketComponent.prototype.removeItem = function (event) {
        this.basketService.removeItemFromBasket(event.id, event.quantity);
    };
    BasketComponent = __decorate([
        core_1.Component({
            selector: 'app-basket',
            templateUrl: './basket.component.html',
            styleUrls: ['./basket.component.scss']
        })
    ], BasketComponent);
    return BasketComponent;
}());
exports.BasketComponent = BasketComponent;
