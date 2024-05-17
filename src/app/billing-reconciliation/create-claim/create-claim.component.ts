import { Component } from '@angular/core';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrl: './create-claim.component.css'
})
export class CreateClaimComponent {

   selectedIndex = 0;
  refinanceContent = `<table class="table">...</table>`; 
  tabs = [
    { title: 'External Claim', content: '' },
    { title: 'Internal Claim', content: '' }, 

  ];

  selectTab(index: number) {
    this.selectedIndex = index;
  }

}
