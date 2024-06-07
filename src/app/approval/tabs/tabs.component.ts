import { Component, Input,OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent  implements OnInit {
  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;
  submittedSuccessfully: any;
  comments: string = '';
  action: string = ''; // Declare the action property
  searchParams: any = { param: 'acid', value: '' };
   pagedCasesdata: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  SearchQuery: string = '';
  pageSize: number = 5;
  selectedItem: any;
  data: any[] = [];
  Casesdata: any[] = [];
  apiUrl: string = '';
   SubmissionsUrl: string = '';
   selectedRowData: any; 
  @Input() loanAccount: any = '';
   SubmitData: any[] = [];








    constructor(private router: Router, private sharedService: SharedService,private toastr: ToastrService,public bsModalRef: BsModalRef,
    private http: HttpClient
  ) {}

  


  selectTab(index: number) {
    this.selectedIndex = index;
  }



  approveDocument() {
    console.log('Document approved');
    // Your logic for document approval goes here
  }

  rejectDocument() {
    console.log('Document rejected');
    // Your logic for document rejection goes here
  }

  // CLAIMS
  approveClaim() {
    console.log('Claim approved');
    console.log('Comments:', this.comments); // Access comments entered by admin

    // Your logic to handle claim approval goes here

    // Set submittedSuccessfully to true and action to 'approve'
    this.submittedSuccessfully = true;
    this.action = 'approved';

    // Reset comments field
    this.comments = '';
  }

  rejectClaim() {
    console.log('Claim rejected');
    console.log('Comments:', this.comments); // Access comments entered by admin

    // Your logic to handle claim rejection goes here

    // Set submittedSuccessfully to true and action to 'reject'
    this.submittedSuccessfully = true;
    this.action = 'rejected';

    // Reset comments field
    this.comments = '';
  }

    // cases methods'

  
  ngOnInit(): void {
    this.apiUrl = this.sharedService.ActivityUrl;
    this.SubmissionsUrl = this.sharedService.SubmissionsUrl;
    this.fetchService();
    this.fetchData();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.filterData(); // Update displayed data when page changes
  }

  onSearch(): void {
    this.currentPage = 1; // Reset current page to 1 when searching
    this.fetchData(); // Refetch data after search
  }

   fetchService(): void {
    this.http.get<any>(this.SubmissionsUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.SubmitData = response.result;
        // this.calculateCaseCounts();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }


  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      response => {
        if (response && response.result && Array.isArray(response.result)) {
          this.data = response.result;
          this.totalItems = this.data.length; // Set total items count
          this.filterData(); // Initial filtering and pagination
        } else {
          console.error('Invalid data received from API:', response);
        }
      },
      error => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.pagedCasesdata = [...this.data];
    } else {
      // Filter data based on selected parameter and value
      this.pagedCasesdata = this.data.filter(item => {
        return item[this.searchParams.param]?.toString().toLowerCase().includes(this.searchParams.value.toLowerCase());
      });
    }

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCasesdata = this.pagedCasesdata.slice(startIndex, endIndex);
  }

}
