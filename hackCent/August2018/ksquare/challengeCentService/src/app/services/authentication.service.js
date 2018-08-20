"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email, password) {
        var serverUrl = window.location.origin;
        if (serverUrl.indexOf('localhost:') > -1) {
            serverUrl = 'http://localhost';
        }
        return this.http.post(serverUrl + ':5000/api/user/login', { email: email, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            console.log('USER', user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user.token));
                localStorage.setItem('user', JSON.stringify(user));
            }
            else {
                localStorage.setItem('token', null);
                localStorage.setItem('user', null);
            }
            return user;
        });
    };
    AuthenticationService.prototype.signup = function (firstName, lastName, email, password) {
        var serverUrl = window.location.origin;
        if (serverUrl.indexOf('localhost:') > -1) {
            serverUrl = 'http://localhost';
        }
        return this.http.post(serverUrl + ':5000/api/user/signup', { firstName: firstName, lastName: lastName, email: email, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            console.log('signup: ', user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user.token));
                localStorage.setItem('user', JSON.stringify(user));
            }
            else {
                localStorage.setItem('token', null);
                localStorage.setItem('user', null);
            }
            return user;
        });
    };
    AuthenticationService.prototype.logout = function () {
        console.log('Login Service Logout');
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Observable_1.Observable.of(true);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
