// Angular Imports.
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
// Application importsn
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  // Add services and data providers here
  // this is used for Injectable items which will
  // be injected into components that request it.
  providers: [

  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
