import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  searchQuery: any = '';
  searchTerm: any = '';
  
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  recentActivityData: any[] = []; // Your data array
  
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

  // Getter for filtered data based on search term
  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.recentActivityData.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.recentActivityData;
    }
  }
  
}


