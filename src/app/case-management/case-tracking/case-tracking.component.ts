import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../shared.service';



@Component({
  selector: 'app-case-tracking',
  templateUrl: './case-tracking.component.html',
  styleUrl: './case-tracking.component.css'
})
export class CaseTrackingComponent {



  searchQuery: string = '';

  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  recentActivityData: any[] = []; // Your data array


  // pageChanged(event: any): void {
  //   this.currentPage = event.page;
  //   this.fetchRecentActivity();
  // }

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchRecentActivity();
  }


  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Call the API to get recent activity data
    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.recentActivityData = data.slice(startIndex, endIndex);
          this.totalItems = data.length;
        } else {
          console.error('Error: Data is not an array.');
        }
      }, error => {
        console.error('Error fetching recent activity:', error);
      });
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentActivity();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.fetchRecentActivity();
  }

}
