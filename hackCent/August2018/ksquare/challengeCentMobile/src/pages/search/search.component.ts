import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Router} from "@angular/router";

declare var google;


@Component({
  selector: 'search-home',
  templateUrl: 'search.component.html'
})
export class SearchPage {



  constructor(private router:Router) {



  }

  push(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.

    this.router.navigateByUrl('/maps');

  }


}
