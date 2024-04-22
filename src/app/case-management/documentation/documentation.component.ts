import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

interface ApiResponse {
  data: any[];
  source: any[];
}

@Component({
  selector: 'app-search-case',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  jsonData: any[] = [];
  pageSize: number = 3;
  currentPage: number = 1;
  totalItems: number = 0;
  searchTerm: string = '';
  searchBy: string = ''; // To store the selected column for searching
  filteredData: any[] = []; // Filtered data to be displayed
  searchClicked: boolean = false; // Tracks whether the search button has been clicked

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.getjsonData();
  }

  getjsonData(): void {
    this.sharedService.getJsonData().subscribe(
      (data: ApiResponse) => {
        this.jsonData = data.data; // Assign original data
        this.totalItems = this.jsonData.length;
        this.applySearchFilter(); // Apply search filter initially
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching JsonData:', error.message);
      }
    );
  }

  // Method to apply search filter
  applySearchFilter(): void {
    let filteredData = this.jsonData;
    if (this.searchTerm && this.searchBy && this.searchClicked) { // Only apply filter if search button is clicked
      filteredData = filteredData.filter(item =>
        item[this.searchBy].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredData = filteredData; // Store filtered data
    this.totalItems = this.filteredData.length;
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.applySearchFilter(); // Apply search filter on page change
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.searchClicked = true; // Set searchClicked toatrue when search button is clicked
    this.applySearchFilter();
  }

  // Method to set the column to search by
  setSearchBy(column: string): void {
    this.searchBy = column;
    this.applySearchFilter(); // Apply search filter when the search column changes
  }

  // Method to dynamically return the placeholder text for search input field
  getPlaceholder(): string {
    switch (this.searchBy) {
      case 'ID Nation':
        return 'Enter Account Number...';
      case 'Nation':
        return 'Enter Account Name...';
      case 'ID Year':
        return 'Enter National Id...';
      case 'Year':
        return 'Enter CIF...';
      case 'Population':
        return 'Enter Loan Amount...';
      case 'Slug Nation':
        return 'Enter Case Number...';
      default:
        return this.searchBy ? `Enter ${this.searchBy}` : 'Select search option first';
    }
  }

  // Navigation methods
  goToCreateMeeting() {
    this.router.navigate(['/create-meeting']);
  }

  goToCaseDecision() {
    this.router.navigate(['/case-decision']);
  }

  goToDocumentation() {
    this.router.navigate(['/documentation']);
  }
}

