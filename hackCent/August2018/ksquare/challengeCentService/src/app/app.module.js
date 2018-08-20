"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular Imports.
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
// Application imports
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
// bootstrap
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var authentication_service_1 = require("./services/authentication.service");
var dashboarddata_service_1 = require("./services/dashboard/dashboarddata.service");
var utils_component_1 = require("./services/utils/utils.component");
// UI Components
var bar_chart_component_1 = require("./components/ui/chart/bar-chart.component");
var pie_chart_component_1 = require("./components/ui/chart/pie-chart.component");
var card_component_1 = require("./components/ui/card/card.component");
var card_content_component_1 = require("./components/ui/card/card-content.component");
var customer_selector_component_1 = require("./components/ui/selectors/customer-selector.component");
var search_menu_component_1 = require("./components/ui/search/search-menu.component");
var tagbar_component_1 = require("./components/ui/tagbar/tagbar.component");
var tagbar_item_component_1 = require("./components/ui/tagbar/tagbar-item.component");
var tag_selector_component_1 = require("./components/ui/selectors/tag-selector.component");
// Route handling components.
var signup_component_1 = require("./components/signup/signup.component");
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var settings_component_1 = require("./components/settings/settings.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                ng_bootstrap_1.NgbModule.forRoot(),
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                bar_chart_component_1.BarChartComponent,
                pie_chart_component_1.PieChartComponent,
                card_component_1.CardComponent,
                card_content_component_1.CardContentComponent,
                customer_selector_component_1.CustomerSelectorComponent,
                dashboard_component_1.DashboardComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignUpComponent,
                settings_component_1.SettingsComponent,
                search_menu_component_1.SearchMenuComponent,
                tagbar_component_1.TagBarComponent,
                tagbar_item_component_1.TagBarItemComponent,
                tag_selector_component_1.TagSelectorComponent,
                customer_selector_component_1.CustomerFilterPipe
            ],
            // Add services and data providers here
            // this is used for Injectable items which will
            // be injected into components that request it.
            providers: [
                utils_component_1.Utils,
                authentication_service_1.AuthenticationService,
                dashboarddata_service_1.DashboardDataService
            ],
            entryComponents: [
                bar_chart_component_1.BarChartComponent,
                pie_chart_component_1.PieChartComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
