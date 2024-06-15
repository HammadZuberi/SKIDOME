"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ShopComponent = void 0;
var core_1 = require("@angular/core");
var ProductParam_1 = require("../shared/Models/ProductParam");
var ShopComponent = /** @class */ (function () {
    function ShopComponent(shopService) {
        this.shopService = shopService;
        this.products = [];
        this.types = [];
        this.brands = [];
        // shopParams =new productParam();
        this.SortOptions = [
            { name: 'Alphabetical', value: 'name' },
            { name: 'price: High to Low', value: 'priceDesc' },
            { name: 'price: Low to High', value: 'priceAsc' },
        ];
        this.totalNumber = 0;
        this.shopParams = this.shopService.getShopPrams();
    }
    ShopComponent.prototype.ngOnInit = function () {
        this.getProducts();
        // console.log(this.shopParams);
        this.getBrands();
        this.getTypes();
    };
    ShopComponent.prototype.getProducts = function () {
        var _this = this;
        this.shopService.getProducts().subscribe({
            next: function (response) {
                _this.products = response.data;
                // this.shopParams.pageSize = response.pageSize;
                // this.shopParams.pageNumber = response.pageIndex;
                _this.totalNumber = response.count;
                // console.log(this.shopParams);
                // console.log(response);
            },
            error: function (e) { return console.error(e); }
        });
    };
    ShopComponent.prototype.getBrands = function () {
        var _this = this;
        this.shopService.getBrands().subscribe({
            next: function (response) {
                _this.brands = __spreadArrays([{ id: 0, name: '-All-' }], response);
            },
            error: function (e) { return console.error(e); }
        });
    };
    ShopComponent.prototype.getTypes = function () {
        var _this = this;
        this.shopService.getTypes().subscribe({
            next: function (response) {
                _this.types = __spreadArrays([{ id: 0, name: '-All-' }], response);
            },
            error: function (e) { return console.error(e); }
        });
    };
    ShopComponent.prototype.onBrandSelected = function (BrandId) {
        var params = this.shopService.getShopPrams();
        params.BrandId = BrandId;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.shopParams = params;
        this.getProducts();
    };
    ShopComponent.prototype.onTypeSelected = function (TypeId) {
        var params = this.shopService.getShopPrams();
        params.TypeId = TypeId;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.shopParams = params;
        this.getProducts();
    };
    ShopComponent.prototype.onSortSelected = function (event) {
        var params = this.shopService.getShopPrams();
        params.SortOptions = event.target.value;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.shopParams = params;
        this.getProducts();
    };
    ShopComponent.prototype.onPageChanged = function (event) {
        var params = this.shopService.getShopPrams();
        if (params.pageNumber != event) {
            params.pageNumber = event;
            this.shopService.setShopParams(params);
            this.shopParams = params;
            this.getProducts();
        }
    };
    ShopComponent.prototype.onSearch = function () {
        var _a;
        var params = this.shopService.getShopPrams();
        params.search = (_a = this.search) === null || _a === void 0 ? void 0 : _a.nativeElement.value;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.shopParams = params;
        this.getProducts();
    };
    ShopComponent.prototype.onReset = function () {
        if (this.search)
            this.search.nativeElement.value = '';
        var params = new ProductParam_1.productParam();
        this.shopService.setShopParams(params);
        this.shopParams = params;
        this.getProducts();
    };
    __decorate([
        core_1.ViewChild('search')
    ], ShopComponent.prototype, "search");
    ShopComponent = __decorate([
        core_1.Component({
            selector: 'app-shop',
            templateUrl: './shop.component.html',
            styleUrls: ['./shop.component.scss']
        })
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
