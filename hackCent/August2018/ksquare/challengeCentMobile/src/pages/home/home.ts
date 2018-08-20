import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchPage} from "../search/search.component";
import {Router} from "@angular/router";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private router:Router) {

  }


  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.

      this.router.navigateByUrl('/search');

  }

}
