"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ShopService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ProductParam_1 = require("../shared/Models/ProductParam");
var rxjs_1 = require("rxjs");
var environment_development_1 = require("src/environments/environment.development");
var ShopService = /** @class */ (function () {
    function ShopService(http) {
        this.http = http;
        this.baseurl = environment_development_1.environment.apiUrl;
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
        var product = __spreadArrays(this.productCache.values()).reduce(function (acc, paginatedResult) {
            //... spread operator
            return __assign(__assign({}, acc), paginatedResult.data.find(function (x) { return x.id === id; }));
        }, {});
        console.log(product);
        if (Object.keys(product).length !== 0)
            return rxjs_1.of(product);
        //return observable instead of product object
        // if (product) return of(product);
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
