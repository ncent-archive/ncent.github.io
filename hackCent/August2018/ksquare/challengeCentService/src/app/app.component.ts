import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

// TODO @wnamen figure out how to add full-size class to host element for this

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'mainapp',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent  {
  name = 'Angular';
}
