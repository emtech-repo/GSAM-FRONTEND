import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-tab',
  templateUrl: './meeting-tab.component.html',
  styleUrls: ['./meeting-tab.component.css']
})
export class MeetingTabComponent {
  Meetings: any[] = [];
  MeetingsUrl: any;
  FetchedMeetings: any[] = [];

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  // Properties for form fields
  searchQuery: string = '';
  selectedVenue: string = '';
  caseDetails: string = '';
  meetingDate: string = '';
  meetingTime: string = '';
  selectedMembers: string[] = []; // Initialize as an empty array

  // Example members list
  
  members = ['member1', 'member2', 'member3'];

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  constructor(private router: Router, private sharedService: SharedService) {
    // Constructor code...
  }

  clearForm() {
    // Reset form fields
    this.searchQuery = '';
    this.selectedVenue = '';
    this.caseDetails = '';
    this.meetingDate = '';
    this.meetingTime = '';
    this.selectedMembers = []; // Reset selected members

    // Optionally, reset the selected tab index if needed
    this.selectedIndex = 0;
  }

  onSubmit() {
    // Implement form submission logic
    console.log('Form submitted with selected members:', this.selectedMembers);
  }

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings(): void {
    this.sharedService.getMeetings()
      .subscribe(
        (meetings: any[]) => {
          console.log('API Response:', meetings);
          if (meetings && meetings.length > 0) {
            this.Meetings = meetings;
          } else {
            console.log('No meetings found or invalid response.');
          }
        },
        error => {
          console.error('Error fetching meetings:', error);
          // Log the error response if available
          if (error.error) {
            console.error('Error details:', error.error);
          }
        }
      );
  }
}
