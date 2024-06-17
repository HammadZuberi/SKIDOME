"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var pagination_1 = require("ngx-bootstrap/pagination");
var pagination_header_component_1 = require("./pagination-header/pagination-header.component");
var pager_component_1 = require("./pager/pager.component");
var carousel_1 = require("ngx-bootstrap/carousel");
var order_total_component_1 = require("./order-total/order-total.component");
var forms_1 = require("@angular/forms");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var input_text_component_1 = require("./components/input-text/input-text.component");
var stepper_component_1 = require("./components/stepper/stepper.component");
var stepper_1 = require("@angular/cdk/stepper");
var basket_summary_component_1 = require("./basket-summary/basket-summary.component");
var router_1 = require("@angular/router");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                pagination_header_component_1.PaginationHeaderComponent,
                pager_component_1.PagerComponent,
                order_total_component_1.OrderTotalComponent,
                input_text_component_1.InputTextComponent,
                stepper_component_1.StepperComponent,
                basket_summary_component_1.BasketSummaryComponent
            ],
            imports: [
                common_1.CommonModule,
                //apply as singleton
                pagination_1.PaginationModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                dropdown_1.BsDropdownModule.forRoot(),
                stepper_1.CdkStepperModule,
                router_1.RouterModule
            ], exports: [
                pagination_1.PaginationModule,
                pagination_header_component_1.PaginationHeaderComponent,
                pager_component_1.PagerComponent,
                carousel_1.CarouselModule,
                order_total_component_1.OrderTotalComponent,
                forms_1.ReactiveFormsModule,
                dropdown_1.BsDropdownModule,
                input_text_component_1.InputTextComponent,
                stepper_component_1.StepperComponent,
                stepper_1.CdkStepperModule,
                basket_summary_component_1.BasketSummaryComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
