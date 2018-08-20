import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { Routes, RouterModule } from '@angular/router';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SearchPage} from "../pages/search/search.component";
import {MapPage} from "../pages/maps/maps.component";


const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'maps',
    component: MapPage
  },
  {
    path: 'search',
    component: SearchPage
  }
];

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RouterModule.forRoot(routes)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    MapPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
