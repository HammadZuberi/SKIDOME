"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShopService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ProductParam_1 = require("../shared/Models/ProductParam");
var rxjs_1 = require("rxjs");
var ShopService = /** @class */ (function () {
    function ShopService(http) {
        this.http = http;
        this.baseurl = 'https://localhost:5001/api/';
        this.products = [];
        this.brands = [];
        this.types = [];
        this.shopParams = new ProductParam_1.productParam();
        //keyvalue pair for cache class property
        this.productCache = new Map();
    }
    ShopService.prototype.getProducts = function (useCache) {
        var _this = this;
        if (useCache === void 0) { useCache = true; }
        if (!useCache)
            this.productCache = new Map();
        if (this.productCache.size > 0 && useCache) {
            if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
                //if key matches
                this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
                if (this.pagination)
                    return rxjs_1.of(this.pagination);
            }
        }
        var params = new http_1.HttpParams();
        if (this.shopParams.TypeId)
            params = params.append('typeId', this.shopParams.TypeId);
        if (this.shopParams.BrandId > 0)
            params = params.append('brandId', this.shopParams.BrandId);
        if (this.shopParams.search)
            params = params.append('search', this.shopParams.search);
        params = params.append('sort', this.shopParams.SortOptions);
        params = params.append('pageSize', this.shopParams.pageSize);
        params = params.append('pageIndex', this.shopParams.pageNumber);
        return this.http
            .get(this.baseurl + 'products', {
            params: params
        })
            .pipe(rxjs_1.map(function (response) {
            // this.products = response.data;
            _this.productCache.set(Object.values(_this.shopParams).join('-'), response);
            // this.products = [...this.products, ...response.data];
            _this.pagination = response;
            return response;
        }));
    };
    ShopService.prototype.setShopParams = function (params) {
        this.shopParams = params;
    };
    ShopService.prototype.getShopPrams = function () {
        return this.shopParams;
    };
    ShopService.prototype.getProductsById = function (id) {
        //get product from local list
        var product = this.products.find(function (p) { return p.id === id; });
        //return observable instead of product object
        if (product)
            return rxjs_1.of(product);
        // let params= new HttpParams();
        // params= params.append("id",id);
        return this.http.get(this.baseurl + 'Products/' + id);
    };
    ShopService.prototype.getBrands = function () {
        var _this = this;
        if (this.brands.length > 0)
            return rxjs_1.of(this.brands);
        return this.http.get(this.baseurl + 'products/brands').pipe(rxjs_1.map(function (response) {
            _this.brands = response;
            return response;
        }));
    };
    ShopService.prototype.getTypes = function () {
        var _this = this;
        if (this.types.length > 0)
            return rxjs_1.of(this.types);
        return this.http
            .get(this.baseurl + 'products/Types')
            .pipe(rxjs_1.map(function (type) { return (_this.types = type); }));
    };
    ShopService.prototype.getImagefromUrl = function (src) {
        this.http.get(src, { responseType: 'blob' }).subscribe(function (response) {
            // Handle the image response here, e.g., display it in your template
            var reader = new FileReader();
            reader.onload = function () {
                src = reader.result;
            };
            reader.readAsDataURL(response);
        });
        return src;
    };
    ShopService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ShopService);
    return ShopService;
}());
exports.ShopService = ShopService;