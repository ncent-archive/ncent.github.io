webpackJsonp([0],{

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(router) {
        this.router = router;
    }
    HomePage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        this.router.navigateByUrl('/search');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/home/home.html"*/'\n<style>\n  ul, ol{\n    /*margin: 0;padding: 0;*/\n    list-style: none;\n  }\n  li {\n    background: #37BC9B;\n    color: #fff;\n    counter-increment: myCounter;\n    margin: 0 0 30px 0;\n    padding: 13px;\n    position: relative;\n    top: 1em;\n    border-radius:  0em 2px 1em 1em;\n    padding-left: 2em;\n    font-size: 1.2em;\n    font-family: Constantia;\n  }\n  li:before{\n    content: counter(myCounter, decimal-leading-zero);\n    display: inline-block;\n    text-align: center;\n    font-size: 2em;\n    line-height: 1.3em;\n    background-color:  #48CFAD;\n    padding: 10px;\n    font-weight: bold;\n    position: absolute;\n    top: 0;\n    left: -40px;\n    border-radius: 50%;\n    font-family: exo;\n  }\n\n\n  li:nth-child(even){\n    background-color: #434A54;\n  }\n\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n     Dashboard : Create a Challenge\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ul>\n    <li (click)="pushPage()">Create a Challenge</li>\n    <li (click)="pushPage()">Find A Challenge</li>\n    <li (click)="pushPage()">Form a Group Challenge</li>\n\n  </ul>\n\n</ion-content>\n'/*ion-inline-end:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_search_search_component__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_maps_maps_component__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
    },
    {
        path: 'maps',
        component: __WEBPACK_IMPORTED_MODULE_9__pages_maps_maps_component__["a" /* MapPage */]
    },
    {
        path: 'search',
        component: __WEBPACK_IMPORTED_MODULE_8__pages_search_search_component__["a" /* SearchPage */]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_search_component__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_maps_maps_component__["a" /* MapPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* RouterModule */].forRoot(routes)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_search_component__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_maps_maps_component__["a" /* MapPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/app/app.html"*/'<ul>\n  <li><a routerLink="">Home</a></li>\n  <li><a routerLink="about">About</a></li>\n</ul>\n\n<router-outlet></router-outlet>\n'/*ion-inline-end:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchPage = /** @class */ (function () {
    function SearchPage(router) {
        this.router = router;
    }
    SearchPage.prototype.push = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        this.router.navigateByUrl('/maps');
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'search-home',template:/*ion-inline-start:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/search/search.component.html"*/'\n<style>\n  ul, ol{\n    /*margin: 0;padding: 0;*/\n    list-style: none;\n  }\n  li {\n    background: #37BC9B;\n    color: #fff;\n    counter-increment: myCounter;\n    margin: 0 0 30px 0;\n    padding: 13px;\n    position: relative;\n    top: 1em;\n    border-radius:  0em 2px 1em 1em;\n    padding-left: 2em;\n    font-size: 1.2em;\n    font-family: Constantia;\n  }\n  li:before{\n    content: counter(myCounter, decimal-leading-zero);\n    display: inline-block;\n    text-align: center;\n    font-size: 2em;\n    line-height: 1.3em;\n    background-color:  #48CFAD;\n    padding: 10px;\n    font-weight: bold;\n    position: absolute;\n    top: 0;\n    left: -40px;\n    border-radius: 50%;\n    font-family: exo;\n  }\n\n\n  li:nth-child(even){\n    background-color: #434A54;\n  }\n\n</style>\n<ion-content padding>\n  Search Challenges\n  <ul>\n    <li (click)="push()">Run a mile in 8 mins</li>\n    <li>Walk Commercial way</li>\n    <li>Nike 10-mile Challenge</li>\n    <li>Find a unique path Challenge</li>\n    <li>Create your own route Challenge</li>\n\n  </ul>\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/search/search.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MapPage = /** @class */ (function () {
    function MapPage() {
        this.start = 'chicago, il';
        this.end = 'chicago, il';
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.initMap();
    };
    MapPage.prototype.initMap = function () {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
        });
        this.directionsDisplay.setMap(this.map);
    };
    MapPage.prototype.calculateAndDisplayRoute = function () {
        var _this = this;
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                _this.directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'maps-home',template:/*ion-inline-start:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/maps/maps.component.html"*/'<style>\n\n  #floating-panel {\n    position: absolute;\n    top: 10px;\n    right: 5px;\n    z-index: 5;\n    background-color: #fff;\n    padding: 5px;\n    border: 1px solid #999;\n    text-align: center;\n    font-family: \'Roboto\', \'sans-serif\';\n    line-height: 30px;\n    padding-left: 10px;\n  }\n  #map {\n    height: 100%;\n  }\n\n\n</style>\n<ion-content>\n  <div id="floating-panel">\n    <script>\n      function myMap() {\n        var mapProp= {\n          center:new google.maps.LatLng(51.508742,-0.120850),\n          zoom:5,\n        };\n        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);\n      }\n    </script>\n    <b>Start: </b>\n    <select [(ngModel)]="start" id="start" (change)="calculateAndDisplayRoute()">\n      <option value="chicago, il">Chicago</option>\n      <option value="st louis, mo">St Louis</option>\n      <option value="joplin, mo">Joplin, MO</option>\n      <option value="oklahoma city, ok">Oklahoma City</option>\n      <option value="amarillo, tx">Amarillo</option>\n      <option value="gallup, nm">Gallup, NM</option>\n      <option value="flagstaff, az">Flagstaff, AZ</option>\n      <option value="winona, az">Winona</option>\n      <option value="kingman, az">Kingman</option>\n      <option value="barstow, ca">Barstow</option>\n      <option value="san bernardino, ca">San Bernardino</option>\n      <option value="los angeles, ca">Los Angeles</option>\n    </select><br>\n    <b>End: </b>\n    <select [(ngModel)]="end" id="end" (change)="calculateAndDisplayRoute()">\n      <option value="chicago, il">Chicago</option>\n      <option value="st louis, mo">St Louis</option>\n      <option value="joplin, mo">Joplin, MO</option>\n      <option value="oklahoma city, ok">Oklahoma City</option>\n      <option value="amarillo, tx">Amarillo</option>\n      <option value="gallup, nm">Gallup, NM</option>\n      <option value="flagstaff, az">Flagstaff, AZ</option>\n      <option value="winona, az">Winona</option>\n      <option value="kingman, az">Kingman</option>\n      <option value="barstow, ca">Barstow</option>\n      <option value="san bernardino, ca">San Bernardino</option>\n      <option value="los angeles, ca">Los Angeles</option>\n    </select>\n  </div>\n  <div id="map" style="width:400px;height:400px"></div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/khalidimam/WebstormProjects/challengeCentMobile/src/pages/maps/maps.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=maps.component.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map