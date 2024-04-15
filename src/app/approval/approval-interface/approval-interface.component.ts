import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-interface',
  templateUrl: './approval-interface.component.html',
  styleUrls: ['./approval-interface.component.css']
})
export class ApprovalInterfaceComponent {
  selectedIndex = 0; // Default selected index is 0 (for the "Cases" tab)
  comments: string = ''; // Comments field

  // Submitted Successfully flag
  submittedSuccessfully = false;

  // Example HTML for the cases content
  casesContent = `
    <table class="table">
      <!-- Table content goes here -->
    </table>
  `;

  // Tabs array
  tabs = [
    { title: 'Cases', content: this.casesContent },
    { title: 'Documents', content: '' }, // Initial empty content for other tabs
    { title: 'Claims', content: '' },
    { title: 'Requests', content: '' },
    { title: 'Meetings', content: '' }
  ];

  // Method to handle tab selection
  selectTab(index: number) {
    this.selectedIndex = index;
    // Your logic for tab selection goes here
  }

  // Method to handle document approval
  approveDocument() {
    console.log('Document approved');
    console.log('Comments:', this.comments); // Access comments entered by manager

    // Your logic to handle document approval goes here
  }

  // Method to handle document rejection
  rejectDocument() {
    console.log('Document rejected');
    console.log('Comments:', this.comments); // Access comments entered by manager

    // Your logic to handle document rejection goes here
  }

  // Method to handle document submission (approval/rejection)
  submit(action: string) {
    console.log('Document ' + action);
    console.log('Comments:', this.comments); // Access comments entered by manager

    // Your logic to handle document approval/rejection goes here

    // Set submittedSuccessfully to true
    this.submittedSuccessfully = true;

    // Reset comments field
    this.comments = '';
  }
}
