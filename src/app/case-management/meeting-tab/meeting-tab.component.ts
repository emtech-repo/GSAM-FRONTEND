import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-meeting-tab',
  templateUrl: './meeting-tab.component.html',
  styleUrls: ['./meeting-tab.component.css']
})
export class MeetingTabComponent implements OnInit {
  Meetings: any[] = [];
  MeetingsUrl: any;
  FetchedMeetings: any[] = [];
  form!: FormGroup

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  // Properties for form fields
  searchQuery: string = '';
  selectedVenue: string = '';
  caseDetails: string = '';
  meetingDate: string = '';
  meetingTime: string = '';
  selectedMembers: string[] = []; // Initialize as an empty array  
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private router: Router, private sharedService: SharedService, private formbuilder: FormBuilder) {
    // Constructor code...
  }

  ngOnInit() {
    this.getMeetings();
    this.getUsersList
    this.form = this.formbuilder.group({
      toppings: [[]]
    })
    this.dropdownList = [
      { item_id: 1, item_text: 'Lanogwa' },
      { item_id: 2, item_text: 'Bramwel' },
      { item_id: 3, item_text: 'Dennis' },
      { item_id: 4, item_text: 'Joe' },
      { item_id: 5, item_text: 'Flacco  ' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      unSelectAllText: "UnSelect All Items From List",
      noDataAvailablePlaceholderText: "There is no item availabale to show",
      allowSearchFilter: true
    };

  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }

  selectTab(index: number) {
    this.selectedIndex = index;
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
        (error: { error: any; }) => {
          console.error('Error fetching meetings:', error);
          // Log the error response if available
          if (error.error) {
            console.error('Error details:', error.error);
          }
        }
      );
  }

  getUsersList(): void {
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
        (error: { error: any; }) => {
          console.error('Error fetching meetings:', error);
          // Log the error response if available
          if (error.error) {
            console.error('Error details:', error.error);
          }
        }
      );
  }
  searchTerm: string = '';
  selectedOption: string = '';

  options = [
    { label: 'Search by..', value: '' },
    { label: 'Meeting ID', value: 'meetingId' },
    { label: 'Meeting Details', value: 'meetingDetails' },
    { label: 'Status', value: 'status' }
  ];

  performSearch() {
    console.log(`Searching for ${this.selectedOption}: ${this.searchTerm}`);
    if (this.selectedOption === "meetingId") {
      const result = this.Meetings.filter(item => item.meetingId.trim().toLowerCase() === this.searchTerm.trim().toLowerCase());
      console.log(result.length > 0 ? 'Found Meeting IDs' : 'No Matching Meeting IDs Found');
      this.Meetings = result;
    } else if (this.selectedOption === "status") {
      const result = this.Meetings.filter(item => item.status.trim().toLowerCase() === this.searchTerm.trim().toLowerCase());
      console.log(result.length > 0 ? 'Found Status Matches' : 'No Matching Status Found');
      this.Meetings = result;
    } else if (this.selectedOption === "venue") {
      const result = this.Meetings.filter(item => item.venue.trim().toLowerCase() === this.searchTerm.trim().toLowerCase());
      console.log(result.length > 0 ? 'Found Venue Matches' : 'No Matching Venues Found');
      this.Meetings = result;
    }
  }
  goToCaseDecision(): void {
    if (this.form.valid) {
      // Navigate to the case decision page
      this.router.navigate(['/case-decision']);
    } else {
      // Handle invalid form submission
      console.error('Please fill in all required fields.');
    }
  }
  goToHome() {
    // Navigate to the "home" route
    this.router.navigate(['/home']);
  }



  
 
  
}
