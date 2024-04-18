import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  selectedIndex = 0; // Assuming the default selected index is 0 (for the "Cases" tab)
  refinanceContent = `<table class="table">...</table>`; // Example HTML for the cases content
  tabs = [
    { title: 'Create User', content: this.refinanceContent },
    { title: 'Update Users', content: '' }, // Initial empty content for other tabs
    { title: 'User', content: '' },

  ];

  selectTab(index: number) {
    this.selectedIndex = index;
    // Your logic for tab selection goes here
  }

}
