"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(accountService) {
        this.accountService = accountService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.accountService.CurrentUser$.pipe(rxjs_1.take(1)).subscribe({
            next: function (user) { return (_this.token = user === null || user === void 0 ? void 0 : user.token); }
        });
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        core_1.Injectable()
        //before sending each request send attach token with it 
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;
