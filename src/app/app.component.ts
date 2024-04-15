import { Component,Inject } from '@angular/core';
import { SharedService } from './shared.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GSAM';
  constructor( public sharedService: SharedService , @Inject(DOCUMENT) private document: Document){
    // if (localStorage.getItem('currentUser')){
    //   this.sharedService.currentUser = localStorage.getItem('currentUser');
    // }
    // console.log(localStorage.getItem('currentUser'))
    const localStorage = document.defaultView?.localStorage;

   
    console.log('end')
  }
  // tabs = [
  //   { label: 'Tab 1', template: '<p>Content for Tab 1</p>' },
  //   { label: 'Tab 2', template: '<p>Content for Tab 2</p>' },
  //   { label: 'Tab 3', template: '<p>Content for Tab 3</p>' }
  // ];
  
}
