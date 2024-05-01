"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AppRoutingModule = void 0;

var core_1 = require("@angular/core");

var router_1 = require("@angular/router");

var home_component_1 = require("./home/home/home.component");

var test_error_component_1 = require("./core/test-error/test-error.component");

var server_error_component_1 = require("./core/server-error/server-error.component");

var not_found_component_1 = require("./core/not-found/not-found.component");

var auth_guard_1 = require("./core/guards/auth.guard");

var routes = [{
  path: '',
  component: home_component_1.HomeComponent,
  data: {
    breadcrumb: 'Home'
  }
}, {
  path: 'not-found',
  component: not_found_component_1.NotFoundComponent
}, {
  path: 'server-error',
  component: server_error_component_1.ServerErrorComponent
}, {
  path: 'test-errors',
  component: test_error_component_1.TestErrorComponent
}, //lazy load shop module
{
  path: 'shop',
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./shop/shop.module');
    }).then(function (m) {
      return m.ShopModule;
    });
  }
}, {
  path: 'basket',
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./basket/basket.module');
    }).then(function (m) {
      return m.BasketModule;
    });
  }
}, {
  path: 'checkout',
  canActivate: [auth_guard_1.authGuard],
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./checkout/checkout.module');
    }).then(function (m) {
      return m.CheckoutModule;
    });
  }
}, {
  path: 'account',
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./account/account.module');
    }).then(function (m) {
      return m.AccountModule;
    });
  }
}, {
  path: 'orders',
  canActivate: [auth_guard_1.authGuard],
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./order/order.module');
    }).then(function (m) {
      return m.OrderModule;
    });
  },
  data: {
    breadcrumb: 'Order'
  }
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];

var AppRoutingModule =
/** @class */
function () {
  function AppRoutingModule() {}

  AppRoutingModule = __decorate([core_1.NgModule({
    imports: [router_1.RouterModule.forRoot(routes)],
    exports: [router_1.RouterModule]
  })], AppRoutingModule);
  return AppRoutingModule;
}();

exports.AppRoutingModule = AppRoutingModule;