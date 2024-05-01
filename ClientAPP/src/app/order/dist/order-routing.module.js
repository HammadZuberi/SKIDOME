"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderRoutingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var orders_component_1 = require("./orders/orders.component");
var order_detailed_component_1 = require("./order-detailed/order-detailed.component");
var routes = [
    { path: '', component: orders_component_1.OrdersComponent },
    {
        path: ':id',
        component: order_detailed_component_1.OrderDetailedComponent,
        data: { breadcrumb: { alias: 'orderDetails' } }
    },
];
var OrderRoutingModule = /** @class */ (function () {
    function OrderRoutingModule() {
    }
    OrderRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], OrderRoutingModule);
    return OrderRoutingModule;
}());
exports.OrderRoutingModule = OrderRoutingModule;
