import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  selectedIndex = 0; // Assuming the default selected index is 0 (for the "Cases" tab)
  adminContent = `<table class="table">...</table>`; // Example HTML for the cases content
  tabs = [
    { title: 'Create User', content: this.adminContent },
    { title: 'Update User', content: '' }, // Initial empty content for other tabs
    { title: 'Users', content: '' },
    { title: 'Reports', content: '' },
  ];

  selectTab(index: number) {
    this.selectedIndex = index;
    // Your logic for tab selection goes here
  }

}
