"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_development_1 = require("src/environments/environment.development");
var http_1 = require("@angular/common/http");
var AccountService = /** @class */ (function () {
    function AccountService(http, router) {
        this.http = http;
        this.router = router;
        this.baseUrl = environment_development_1.environment.apiUrl;
        // private CurrentUserSource = new BehaviorSubject<User | null>(null);
        this.CurrentUserSource = new rxjs_1.ReplaySubject(1);
        this.CurrentUser$ = this.CurrentUserSource.asObservable();
    }
    AccountService.prototype.login = function (values) {
        var _this = this;
        return this.http.post(this.baseUrl + 'account/login', values).pipe(rxjs_1.map(function (user) {
            localStorage.setItem('token', user.token);
            _this.CurrentUserSource.next(user);
        }));
    };
    AccountService.prototype.loadCurrentUser = function (token) {
        var _this = this;
        if (token === null) {
            //initialize replay subject
            this.CurrentUserSource.next(null);
            //observable of somethid
            return rxjs_1.of(null);
        }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', "Bearer " + token);
        return this.http.get(this.baseUrl + 'account', { headers: headers }).pipe(rxjs_1.map(function (user) {
            if (user) {
                localStorage.setItem('token', user.token);
                _this.CurrentUserSource.next(user);
                return user;
            }
            return null;
        }));
    };
    AccountService.prototype.register = function (values) {
        var _this = this;
        return this.http.post(this.baseUrl + 'account/register', values).pipe(rxjs_1.map(function (user) {
            localStorage.setItem('token', user.token);
            _this.CurrentUserSource.next(user);
        }));
    };
    AccountService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.CurrentUserSource.next(null);
        this.router.navigateByUrl('/');
    };
    AccountService.prototype.checkEmailExists = function (email) {
        return this.http.get(this.baseUrl + 'account/emailExists?email=' + email);
    };
    AccountService.prototype.getUserAddress = function () {
        return this.http.get(this.baseUrl + 'account/address');
    };
    AccountService.prototype.updateUserAddress = function (address) {
        return this.http.put(this.baseUrl + 'account/address', address);
    };
    AccountService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
