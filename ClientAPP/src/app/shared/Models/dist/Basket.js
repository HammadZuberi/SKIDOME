"use strict";
exports.__esModule = true;
exports.Basket = void 0;
var cuid = require("cuid");
//create a class to generate id
var Basket = /** @class */ (function () {
    function Basket() {
        this.id = cuid();
        this.items = [];
    }
    return Basket;
}());
exports.Basket = Basket;
