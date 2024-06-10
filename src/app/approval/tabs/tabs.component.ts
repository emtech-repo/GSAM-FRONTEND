import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import jsPDF from 'jspdf';
// import bootstrap from 'bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
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
  ApprovalRequestsUrl: string = '';
  RejectRequestsUrl: string = '';
  selectedRowData: any;
  @Input() loanAccount: any = '';
  SubmitData: any[] = [];
  message: string = '';
  response: any;
  // SubmitModalData: any = {};








  constructor(private router: Router, private sharedService: SharedService, private toastr: ToastrService, public bsModalRef: BsModalRef,
    private http: HttpClient
  ) { }




  selectTab(index: number) {
    this.selectedIndex = index;
  }
  
  openSubmitModal(item: any) {
    console.log('Item received in openSubmitModal:', item); // Log the item to ensure it has the expected properties

    // Get the modal form elements
    
    const requestId = document.getElementById('requestId') as HTMLInputElement;
    const serviceName = document.getElementById('serviceName') as HTMLInputElement;
    const serviceProviderName = document.getElementById('serviceProviderName') as HTMLInputElement;
    const providerAccountNumber = document.getElementById('providerAccountNumber') as HTMLInputElement;
    const providerPhoneNumber = document.getElementById('providerPhoneNumber') as HTMLInputElement;
    console.log(requestId); // Logs the element with ID 'myElement'
    
    const status = document.getElementById('status') as HTMLInputElement;
    // const loanBalance = document.getElementById('loanBalance') as HTMLInputElement;

    // Populate the form fields with the item data
   
    requestId.value = item.requestId;
    serviceName.value = item.serviceName;
    serviceProviderName.value = item.serviceProviderName;
    providerAccountNumber.value = item.providerAccountNumber;
    providerPhoneNumber.value = item.providerPhoneNumber;
    // serviceDate.value = item.serviceDate;
    status.value = item.status;
    // loanBalance.value = item.loanBalance;
    
    // Get the modal element
    const modalElement = document.getElementById('approveserviceModal');

    // Check if the modal element exists
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }

  }


  closeSubmitModal() {
    const modalElement = document.getElementById('approveserviceModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
    
  }

  approveSubmitService() {
    // this.showModalMessage('Request Approved', 'alert-success');
    this.postSubmitData('approve');
    // this.closeSubmitModal();
  } 
  rejectSubmitService() {
    // this.showModalMessage('Request Rejected', 'alert-danger');
    this.postRejectData('reject');
    // this.closeSubmitModal();
  }


  showModalMessage(message: string, alertClass: string) {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) {
      modalMessage.innerText = message;
      modalMessage.className = `alert ${alertClass}`;
      modalMessage.style.display = 'block';
    }
    }

  postRejectData(action: string) {
    const data = {
      RequestId: (document.getElementById('requestId') as HTMLInputElement).value,
      ServiceName: (document.getElementById('serviceName') as HTMLInputElement).value,
      ServiceProviderName: (document.getElementById('serviceProviderName') as HTMLInputElement).value,
      ProviderAccountNumber: (document.getElementById('providerAccountNumber') as HTMLInputElement).value,
      PageTransitionEventroviderPhoneNumber: (document.getElementById('providerPhoneNumber') as HTMLInputElement).value,
      Status: (document.getElementById('status') as HTMLInputElement).value,
      ApproverComments: (document.getElementById('comments') as HTMLInputElement).value,
      action: action
    };

    this.http.post<any>(this.RejectRequestsUrl, data).subscribe(
      response => {
        console.log('Data posted successfully:', response);
        if (action === 'reject') {
          this.message= response.message
          this.toastr.success(response.message);
          this.showModalMessage(response.message, 'alert-danger');
        } 
         else {
          this.message = response.message
          this.toastr.success(response.message);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error posting data:', error);
        if (error.status === 404) {
          this.toastr.error('API endpoint not found. Please check the URL.');
        } else {
          this.toastr.error('An error occurred while processing your request');
        }
      }
    );
  }

  postSubmitData(action: string) {
    const data = {
      RequestId: (document.getElementById('requestId') as HTMLInputElement).value,
      ServiceName: (document.getElementById('serviceName') as HTMLInputElement).value,
      ServiceProviderName: (document.getElementById('serviceProviderName') as HTMLInputElement).value,
      ProviderAccountNumber: (document.getElementById('providerAccountNumber') as HTMLInputElement).value,
      PageTransitionEventroviderPhoneNumber: (document.getElementById('providerPhoneNumber') as HTMLInputElement).value,
      Status: (document.getElementById('status') as HTMLInputElement).value,
      ApproverComments: (document.getElementById('comments') as HTMLInputElement).value,
      action: action
    };

    this.http.post<any>(this.ApprovalRequestsUrl, data).subscribe(
      response => {
        console.log('Data posted successfully:', response);
        if (action === 'approve') {
          this.message = response.message
          this.toastr.success(response.message);
          this.showModalMessage(response.message, 'alert-success');

        } else if (action === 'reject') {
          this.message = response.message
          this.toastr.success(response.message);
        } else {
          this.message = response.message
          this.toastr.success(response.message);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error posting data:', error);
        if (error.status === 404) {
          this.toastr.error('API endpoint not found. Please check the URL.');
        } else {
          this.toastr.error('An error occurred while processing your request');
        }
      }
    );
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
    this.ApprovalRequestsUrl = this.sharedService.ApprovalRequestsUrl;
    this.RejectRequestsUrl = this.sharedService.RejectRequestsUrl;

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