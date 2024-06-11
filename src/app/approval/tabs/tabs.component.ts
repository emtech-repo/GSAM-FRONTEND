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

  Data = {
  
    caseNumber: '',
    
  };
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
   unapprovedcaseUrl: string = '';
   SubmissionsUrl: string = '';
   selectedRowData: any; 
  @Input() loanAccount: any = '';
   SubmitData: any[] = [];
    responseMessage: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  caseNumber: any;
  unapprovedcasedata: any[] = [];

  recoveredCasesdata: any[] = [];
  refinancedCasesdata: any[] = [];
  restructuredCasesdata: any[] = [];
  recoveredCasesUrl: string = '';
  refinancedCasesUrl: string = '';
 restructuredCasesUrl: string = '';




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
    this.unapprovedcaseUrl = this.sharedService.unapprovedcaseUrl;
    this.SubmissionsUrl = this.sharedService.SubmissionsUrl;
     this.recoveredCasesUrl = this.sharedService.recoveredCasesUrl;
    this.refinancedCasesUrl = this.sharedService.refinancedCasesUrl;
     this.restructuredCasesUrl = this.sharedService.restructuredCasesUrl;


    this.fetchService();  // fetching requests
    this.getUnApprovedCases(); // fetching cases
     this. getrecoveredCases();  // fetching recovered cases
    this.getrefinancedCases(); // fetching refinanced cases
    this. getrestructuredCases(); // fetching restructured cases
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.filterData(); // Update displayed data when page changes
  }

  onSearch(): void {
    this.currentPage = 1; // Reset current page to 1 when searching
    this.getUnApprovedCases(); // Refetch data after search
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

 // fetching cases
  
 getrecoveredCases(): void {
    this.http.get<any>(this.recoveredCasesUrl ).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.recoveredCasesdata = response.result;
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  getrefinancedCases(): void {
    this.http.get<any>(this.refinancedCasesUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.refinancedCasesdata = response.result;
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  getUnApprovedCases(): void {
    this.http.get<any>(this.restructuredCasesUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.restructuredCasesdata = response.result;
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

 getrestructuredCases(): void {
    this.http.get<any>(this.unapprovedcaseUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.unapprovedcasedata = response.result;
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }
 // fetching cases
  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.unapprovedcasedata = [...this.data];
    } else {
      // Filter data based on selected parameter and value
      this.unapprovedcasedata = this.data.filter(item => {
        return item[this.searchParams.param]?.toString().toLowerCase().includes(this.searchParams.value.toLowerCase());
      });
    }

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.unapprovedcasedata = this.unapprovedcasedata.slice(startIndex, endIndex);
  }

      // cases modal method for autofilling a form

 openModal(item: any) {
  // Get the modal form elements
  const caseNumber = document.getElementById('caseNumber') as HTMLInputElement;
  const cifId = document.getElementById('cifId') as HTMLInputElement;
  const loanAccount = document.getElementById('loanAccount') as HTMLInputElement;
  const accountName = document.getElementById('accountName') as HTMLInputElement;
  const loanAmount = document.getElementById('loanAmount') as HTMLInputElement;
  const loanTenure = document.getElementById('loanTenure') as HTMLInputElement;
  const solId = document.getElementById('solId') as HTMLInputElement;
  const loanBalance = document.getElementById('loanBalance') as HTMLInputElement;

  // Populate the form fields with the item data
  caseNumber.value = item.caseNumber;
  cifId.value = item.cifId;
  loanAccount.value = item.loanAccount;
  accountName.value = item.accountName;
  loanAmount.value = item.loanAmount;
  loanTenure.value = item.loanTenure;
  solId.value = item.solId;
  loanBalance.value = item.loanBalance;

  // Assign the caseNumber to this.Data
  this.Data.caseNumber = item.caseNumber;
}
 //end of cases autofill form

approveCase(): void {
  // Ensure caseNumber is valid
  if (!this.Data.caseNumber) {
    console.error('Case number is undefined or empty.');
    return;
  }

  // Constructing the data object to be submitted
  const approveCaseData = {
    CaseNumber: this.Data.caseNumber,
  };

  console.log('Case Data to be Submitted:', approveCaseData);
  this.loading = true; // Indicate loading state

  // Attempt to approve the case
  this.sharedService.approveCase(approveCaseData).subscribe(
    (response: any) => {
      console.log('Response received:', response);
      this.loading = false; // Reset loading state upon success
      this.successMessage = 'Case approved successfully!';
      this.responseMessage = response.message; // Set the response message
      this.toastr.success('Case approved successfully!', 'Success');
    },
    (error: any) => {
      this.loading = false; // Reset loading state upon failure
      console.error('Error approving case:', error);
      this.errorMessage = 'Failed to approve case. Please try again.';
      this.toastr.error('Failed to approve case. Please try again.', 'Error');
    }
  );

 // End of approve case functionality case
}



}
