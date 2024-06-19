"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoadingInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_development_1 = require("src/environments/environment.development");
var LoadingInterceptor = /** @class */ (function () {
    function LoadingInterceptor(busyservice) {
        this.busyservice = busyservice;
    }
    LoadingInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        if (request.url.includes('emailExists') ||
            (request.method == 'POST' && request.url.includes('orders')) ||
            request.method === 'DELETE') {
            // return next.handle(request);
            //rxjx operator
            return next.handle(request);
        }
        this.busyservice.busy();
        return next.handle(request).pipe(
        // delay(1000),
        environment_development_1.environment.production ? rxjs_1.identity : rxjs_1.delay(200), rxjs_1.finalize(function () { return _this.busyservice.idle(); }));
    };
    LoadingInterceptor = __decorate([
        core_1.Injectable()
    ], LoadingInterceptor);
    return LoadingInterceptor;
}());
exports.LoadingInterceptor = LoadingInterceptor;
