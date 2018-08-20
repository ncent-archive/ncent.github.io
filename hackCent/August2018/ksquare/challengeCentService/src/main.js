"use strict";
// reference to es6 typescript types.
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
