
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { SharedService } from '../../shared.service';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-contract-inter',
  templateUrl: './contract-inter.component.html',
   styleUrls: ['./contract-inter.component.css']
})
export class ContractInterComponent implements OnInit {

applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  loansAll: any[] = [];
  recentFiles: any;
  activeTab: string = 'viewContract';
  searchParams: { param: string, value: string } = { param: '', value: '' }; // Initialize searchParams object


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchRecentStatus();
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
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

  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.loansAll = [...this.loansAll];
    } else {
      // Filter data based on selected parameter and value
      this.loansAll = this.loansAll.filter(item => {
        return item[this.searchParams.param] === this.searchParams.value;
      });
    }
    this.totalItems = this.loansAll.length;
    // this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  search(): void {
    console.log('Search method called'); // Add this line for debugging
    this.currentPage = 1;
    this.loansAll;

  }



  ngOnDestroy(): void {
    // Your existing ngOnDestroy logic here...
  }

  handleFileInput(event: any): void {
    // Your existing handleFileInput logic here...
  }

  uploadContract(): void {
    // Add your uploadContract logic here...
  }
  uploadFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Example: Send the file to a backend endpoint
      // // this.http.post('/api/upload', file).subscribe(
      //   response => console.log(response),
      //   error => console.error(error)
      // );
    }
  }
}

