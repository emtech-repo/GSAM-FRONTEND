import { Component } from '@angular/core';

@Component({
  selector: 'app-case-decision',
  templateUrl: './case-decision.component.html',
  styleUrl: './case-decision.component.css'
})
export class CaseDecisionComponent {

  selectedIndex = 0; // Assuming the default selected index is 0 (for the "Cases" tab)
  refinanceContent = `<table class="table">...</table>`; // Example HTML for the cases content
  tabs = [
    { title: 'Refinance', content: this.refinanceContent },
    { title: 'Restructure', content: '' }, // Initial empty content for other tabs
    { title: 'Recover', content: '' },

  ];

  selectTab(index: number) {
    this.selectedIndex = index;
    // Your logic for tab selection goes here
  }


}
