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
  
}
