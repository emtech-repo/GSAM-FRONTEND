import { Component } from '@angular/core';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.css'
})
export class CreateMeetingComponent {


  selectedIndex = 0; // Assuming the default selected index is 0 (for the "Cases" tab)
  meetingsContent = `<table class="table">...</table>`; // Example HTML for the cases content
  tabs = [
    { title: 'Create Meeting', content: this.meetingsContent },
    { title: 'View Meetings', content: '' }, // Initial empty content for other tabs



  ];
  selectTab(index: number) {
    this.selectedIndex = index;
    // Your logic for tab selection goes here
  }
}
