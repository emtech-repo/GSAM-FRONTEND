import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-case-tracking',
  templateUrl: './case-tracking.component.html',
  styleUrls: ['./case-tracking.component.css']
})
export class CaseTrackingComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  loansAll: any[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchRecentStatus();
  }

  fetchRecentStatus(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sharedService.getRecentStatus(this.searchQuery).subscribe(
      (response: any) => { // Handle type conversion here if needed
        console.log('Response from API:', response); // Log the response for debugging
        if (response && response.entity && Array.isArray(response.entity)) {
          // Slice the 'entity' array and update 'loansAll' and 'totalItems'
          const slicedEntities = response.entity.slice(startIndex, endIndex < response.entity.length ? endIndex : response.entity.length);
          this.loansAll = slicedEntities;
          this.totalItems = response.entity.length;
        } else {
          console.error('Invalid data received from API:', response);
        }
      },
      error => {
        console.error('Error fetching recent activity:', error);
      }
    );
  }



  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentStatus();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchRecentStatus();
  }
}
