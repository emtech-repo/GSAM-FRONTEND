import { Component, OnInit,OnDestroy} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
interface LoanDetailsResponse {
  entity: any; // Define the structure according to your API response
}


@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrls: ['./search-case.component.css']
})
export class SearchCaseComponent implements OnInit {
  
  loanDetails: any;
  // LoanData: any = {};
  LoanData: any[] = [];
  // loanDetails:any[]=[];
  // activeTab: string = '';
  loanItem :any;
  // Adjust the type as necessary
  activeTab: string = 'general'; 
  // Assuming LoanData is the JSON object returned by the API
  pagedLoanData: any = {}; // Array to hold the currently displayed page data
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchParams: any = { param: 'acid', value: '' };
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
     // Assign a value to accountId
    this.getLoan();
    // this.getLoanDetails();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  // TypeScript
 

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updatePagedLoanData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedLoanData = this.LoanData.slice(startIndex, endIndex);
  }
    pageChanged(event: any): void {
    this.currentPage = event.page;
    this.updatePagedLoanData();
  }
 
  getLoan(): void {
    this.sharedService.getLoan().pipe(takeUntil(this.destroy$)).subscribe(
      
      (response: any) => {
        // console.log('Loan Data:', response.entity);
        this.LoanData = response.entity; // Assuming 'entity' is an array of loan objects
        this.totalItems = this.LoanData.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.filterData();
        this.updatePagedLoanData();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching loans:', error);
      }
    );
  }  
  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.LoanData = [...this.LoanData];
    } else {
      // Filter data based on selected parameter and value
      this.LoanData = this.LoanData.filter(item => {
        return item[this.searchParams.param] === this.searchParams.value;
      });
    }
    this.totalItems = this.LoanData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  search(): void {
    console.log('Search method called'); // Add this line for debugging
    this.currentPage = 1;
    this.getLoan();
  }
  getLoanDetails(acccountId: string): void {
    this.sharedService.getLoanDetails(acccountId).subscribe(
      (response: any) => {
        console.log('Loan Details:', response);
        this.loanDetails = response.entity;
        // Handle loan details here
        // const url = '/search-case/' + acccountId; // Adjust the URL as needed
        // window.open(url, '_blank');
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching loan details:', error);
      }
    );
  }
}