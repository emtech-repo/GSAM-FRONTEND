
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; // If needed

import { SharedService } from '../../shared.service';
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

export class TabsComponent  implements OnInit {

  Data = {caseNumber: '', };
   
  RestructureData = {caseNumber: '',
    
  };
   RefinancedData = {caseNumber: '',
    
  };
    RecoveredData = {caseNumber: '',
    
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
  pageSize: number = 7;
  selectedItem: any;
  data: any[] = [];
  Casesdata: any[] = [];
  unapprovedcaseUrl: string = '';
   SubmissionsUrl: string = '';
   selectedRowData: any; 
  @Input() loanAccount: any = '';
   SubmitData: any[] = [];
  responseMessage: string = '';
  document: any;
  documents: any[] = []; 
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
  isRejectionVisible: boolean = false;
  rejectionMessage: string = '';
  ApprovalRequestsUrl: string = '';
  RejectRequestsUrl: string = ''
  message: any;
  actionType: string | null = null;

  UnApprovedRefinancedCasesUrl: string = '';
  UnApprovedRestructuredCasesUrl: string = '';
 
  


 ApprovalRequestsUrl: string = '';
 RejectRequestsUrl: string = ''
 message: any;
 actionType: string |null=null;
 isRejectionVisible: boolean = false;
  isApprovalVisible: boolean = false;
  rejectionMessage: string = '';
  approvalMessage: string = '';
  errorMessage: string = '';
 
  



    constructor(private router: Router, private sharedService: SharedService,private toastr: ToastrService,public bsModalRef: BsModalRef, private route: ActivatedRoute,
    private http: HttpClient
  ) {}

   ngOnInit(): void {
    this.unapprovedcaseUrl = this.sharedService.unapprovedcaseUrl;
    this.SubmissionsUrl = this.sharedService.SubmissionsUrl;
    this.recoveredCasesUrl = this.sharedService.recoveredCasesUrl;
    this.UnApprovedRefinancedCasesUrl = this.sharedService.UnApprovedRefinancedCasesUrl;
    this.UnApprovedRestructuredCasesUrl = this.sharedService.UnApprovedRestructuredCasesUrl;
    this.ApprovalRequestsUrl = this.sharedService.ApprovalRequestsUrl;
    this.RejectRequestsUrl = this.sharedService.RejectRequestsUrl;
    this.route.params.subscribe(params => {
      
      const documentId = params['id'];
      
    });


    this.fetchService();  // fetching requests
    this.getUnApprovedCases(); // fetching cases
     this. getrecoveredCases();  // fetching recovered cases
    this.getUnApprovedRefinancedCases(); // fetching refinanced cases
    this. getUnApprovedRestructuredCases(); // fetching restructured cases
  }

    setAction(action: string) {
    this.actionType = action;
  }
  handleSubmit(document:any) {
    this.loading = true;
    if (this.actionType === 'approve') {
      this.approveDocument(document);
    } else if (this.actionType === 'reject') {
      this.rejectDocument(document);
    }
  }
  goBack() {
    this.router.navigate(['/retrieve']); // Assuming 'retrieve' is the route path for your retrieve component
  }

   approveDocument(document: any) {
    if (!document || !document.comments) {
      return;
    }
    this.sharedService.approveDocument(document.documentUrl, document.comments,document.id)
      .subscribe(
        (response) => {
          // this.loading = false;
          this.successMessage = response.message;
          this.document.verifiedFlag = 'Y';
          this.updateDocumentStatus(this.document.id, 'Y')
          
          // Optionally, you can update the UI or perform any other action after approval
        },
        (error) => {
          // this.errorMessage = response.message;
          
        }
      );


     updateDocumentStatus(id: string, status: string) {

    const document = this.documents.find(doc => doc.id === id);
    if (document) {
      document.verifiedFlag = status;
      document.rejectedFlag = status;
    }
  }
  
  fetchDocuments(): void {
    this.sharedService.getPendingDocuments().subscribe(
      (response) => {
        console.log('Documents fetched successfully:', response);

        this.documents = response.result.filter((document: any) => document.verifiedFlag === 'N' || document.rejectedFlag === 'N');

      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }



  rejectDocument(document: any) {
    if (!document || !document.comments) {
      return;
    };
    const documentUrl = document.documentUrl;
    const comments = document.comments;
    const id = document.id;
    this.sharedService.rejectDocument(document.documentUrl, document.comments, document.id).subscribe(
      (response) => {
        this.successMessage = response.message;
        // Setting verifiedFlag to 'N'
        this.document.rejectedFlag = 'Y'; // Setting rejectFlag to 'Y'

        this.updateDocumentStatus(document.id, 'Y'); // Updating document status

        console.log('Document rejected successfully:', response);
        // Optionally, you can update the UI or perform any other action after rejection
      },
      (error) => {
        console.error('Error rejecting document:', error);
      }
    );




    
  
}

  viewDocument(document: any) {
    // Implement logic to view the submission details
  }



  



  selectTab(index: number) {
    this.selectedIndex = index;
  }
  
  openSubmitModal(item: any) {
    // Ensure item contains expected properties
    if (!item) {
      console.error('Invalid item:', item);
      return;
    }
    // Populate modal fields
    const requestId = document.getElementById('requestId') as HTMLInputElement;
    const serviceName = document.getElementById('serviceName') as HTMLInputElement;
    const serviceProviderName = document.getElementById('serviceProviderName') as HTMLInputElement;
    const providerAccountNumber = document.getElementById('providerAccountNumber') as HTMLInputElement;
    const providerPhoneNumber = document.getElementById('providerPhoneNumber') as HTMLInputElement;
    const status = document.getElementById('status') as HTMLInputElement;

    if (requestId && serviceName && serviceProviderName && providerAccountNumber && providerPhoneNumber && status) {
      requestId.value = item.requestId || '';
      serviceName.value = item.serviceName || '';
      serviceProviderName.value = item.serviceProviderName || '';
      providerAccountNumber.value = item.providerAccountNumber || '';
      providerPhoneNumber.value = item.providerPhoneNumber || '';
      status.value = item.status || '';
    }

    const modalElement = document.getElementById('approveserviceModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
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

  
 
   sortSubmitData(): void {
    this.SubmitData.sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());
  }

 filterData(): void {
    const startItem = (this.currentPage - 1) * this.pageSize;
    const endItem = startItem + this.pageSize;
    this.unapprovedcasedata = this.refinancedCasesdata.slice(startItem, endItem);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.filterData(); // Update displayed data when page changes
  }

    onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search

    let searchParamKey: string = this.searchParams.param;
    if (!searchParamKey) {
      console.error('Search parameter is not selected');
      return;
    }

    const searchValue: string = this.searchParams.value.toLowerCase();

    this.unapprovedcasedata = this.data.filter(item => {
      return item[searchParamKey]?.toString().toLowerCase().includes(searchValue);
    });

    this.totalItems = this.unapprovedcasedata.length;
    this.getUnApprovedCases();
  }

  search(): void {
    console.log('Search method called');
    this.currentPage = 1; // Reset current page for search

    let searchParamKey: string;
    switch (this.searchParams.param) {
      case 'loanAccount':
        searchParamKey = 'loanAccount';
        break;
      case 'accountName':
        searchParamKey = 'accountName';
        break;
      case 'caseNumber':
        searchParamKey = 'caseNumber';
        break;
      case 'cifId':
        searchParamKey = 'cifId';
        break;
      default:
        console.error('Invalid search parameter');
        return;
    }

    this.restructuredCasesdata = this.data.filter(item => {
      return item[searchParamKey].toLowerCase().includes(this.searchParams.value.toLowerCase());
    });
    this.totalItems = this.restructuredCasesdata.length;
    this.getUnApprovedRestructuredCases();
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

  getUnApprovedRefinancedCases(): void {
    this.http.get<any>(this.UnApprovedRefinancedCasesUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.refinancedCasesdata = response.result;
        this.totalItems = this.refinancedCasesdata.length;
        this.filterData();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  getUnApprovedCases(): void {
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

 getUnApprovedRestructuredCases(): void {
    this.http.get<any>(this.UnApprovedRestructuredCasesUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.restructuredCasesdata = response.result;
        
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }
 // fetching cases
 
      //  method for  approve autofilling a form

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

approveCase(): void {
  // Ensure caseNumber is valid
  if (!this.Data.caseNumber) {
    console.error('Case number is undefined or empty.');
    return;
  }
   // Validate the approval message
  if (!this.approvalMessage.trim()) {
    this.errorMessage = 'The Approval Message field is required.';
    return;
  }

  // Constructing the data object to be submitted
  const approveCaseData = {
    CaseNumber: this.Data.caseNumber,
    ApproverRemarks: this.approvalMessage // Include the approval message
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
      this.isApprovalVisible = false; // Hide the approval textarea
      this.approvalMessage = ''; // Reset the approval message
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


      // restructure modal method for autofilling a form

openRestructureModal(item: any) {
  // Populate the form fields with the item data
  const modalForm = document.getElementById('approveRestructureCaseForm') as HTMLFormElement;

  // Loop through each input and textarea element in the form
  modalForm.querySelectorAll('input, textarea').forEach((element: Element) => {
    const fieldName = (element as HTMLInputElement | HTMLTextAreaElement).id;
    if (fieldName && item.hasOwnProperty(fieldName)) {
      // Handle different types of elements appropriately
      if (element.tagName === 'INPUT') {
        // For input elements
        (element as HTMLInputElement).value = item[fieldName];
      } else if (element.tagName === 'TEXTAREA') {
        // For textarea elements
        (element as HTMLTextAreaElement).value = item[fieldName];
      }
    }
  });

  // Assign the caseNumber to RestructureData
  this.RestructureData.caseNumber = item.caseNumber;
}

approveRestructuredCase(): void {
  // Ensure caseNumber is valid
  if (!this.RestructureData.caseNumber) {
    console.error('Case number is undefined or empty.');
    return;
  }
   if (!this.approvalMessage.trim()) {
    this.errorMessage = 'The Approval Message field is required.';
    return;
  }

  // Constructing the data object to be submitted
  const approveRestructureData = {
    CaseNumber: this.RestructureData.caseNumber,
    ApproverRemarks: this.approvalMessage // Include the approval message
  };

  console.log('Case Data to be Submitted:', approveRestructureData);
  this.loading = true; // Indicate loading state

  // Attempt to approve the case
  this.sharedService.approveRestructuredCases(approveRestructureData).subscribe(
     (response: any) => {
      console.log('Response received:', response);
      this.loading = false; // Reset loading state upon success
      this.successMessage = ' Restructured Case  approved successfully!';
      this.responseMessage = response.message; // Set the response message
      this.toastr.success(' Restructured Case approved successfully!', 'Success');
      this.isApprovalVisible = false; // Hide the approval textarea
      this.approvalMessage = ''; // Reset the approval message
    },
    (error: any) => {
      this.loading = false; // Reset loading state upon failure
      console.error('Error approving case:', error);
      this.errorMessage = 'Failed to approve case. Please try again.';
      this.toastr.error('Failed to approve case. Please try again.', 'Error');
    }
  );
}


      // refinance modal method for autofilling a form

openRefinanceModal(item: any) {
  // Populate the form fields with the item data
  const modalForm = document.getElementById('approveRefinanceCaseForm') as HTMLFormElement;

  // Loop through each input and textarea element in the form
  modalForm.querySelectorAll('input, textarea').forEach((element: Element) => {
    const fieldName = (element as HTMLInputElement | HTMLTextAreaElement).id;
    if (fieldName && item.hasOwnProperty(fieldName)) {
      // Handle different types of elements appropriately
      if (element.tagName === 'INPUT') {
        // For input elements
        (element as HTMLInputElement).value = item[fieldName];
      } else if (element.tagName === 'TEXTAREA') {
        // For textarea elements
        (element as HTMLTextAreaElement).value = item[fieldName];
      }
    }
  });
 this.RefinancedData.caseNumber = item.caseNumber;
  
}
approveRefinancedCases(): void {
  // Ensure caseNumber is valid
  if (!this.RefinancedData.caseNumber) {
    console.error('Case number is undefined or empty.');
    return;
  }
   // Validate the approval message
  if (!this.approvalMessage.trim()) {
    this.errorMessage = 'The Approval Message field is required.';
    return;
  }

  // Constructing the data object to be submitted
  const approveRefinancedData= {
    CaseNumber: this.RefinancedData.caseNumber,
    ApproverRemarks: this.approvalMessage // Include the approval message
  };

  console.log('Case Data to be Submitted:', approveRefinancedData);
  this.loading = true; // Indicate loading state

  // Attempt to approve the case
  this.sharedService.approveRefinancedCases(approveRefinancedData).subscribe(
     (response: any) => {
      console.log('Response received:', response);
      this.loading = false; // Reset loading state upon success
      this.successMessage = ' Refinanced Case  approved successfully!';
      this.responseMessage = response.message; // Set the response message
      this.toastr.success(' Refinanced Case Case approved successfully!', 'Success');
      this.isApprovalVisible = false; // Hide the approval textarea
      this.approvalMessage = ''; // Reset the approval message
    },
    (error: any) => {
      this.loading = false; // Reset loading state upon failure
      console.error('Error approving case:', error);
      this.errorMessage = 'Failed to approve case. Please try again.';
      this.toastr.error('Failed to approve case. Please try again.', 'Error');
    }
  );
}


      // recovery  modal method for autofilling a form

openRecoveryModal(item: any) {
  // Populate the form fields with the item data
  const modalForm = document.getElementById('approveRecoveryCaseForm') as HTMLFormElement;

  // Loop through each input and textarea element in the form
  modalForm.querySelectorAll('input, textarea').forEach((element: Element) => {
    const fieldName = (element as HTMLInputElement | HTMLTextAreaElement).id;
    if (fieldName && item.hasOwnProperty(fieldName)) {
      // Handle different types of elements appropriately
      if (element.tagName === 'INPUT') {
        // For input elements
        (element as HTMLInputElement).value = item[fieldName];
      } else if (element.tagName === 'TEXTAREA') {
        // For textarea elements
        (element as HTMLTextAreaElement).value = item[fieldName];
      }
    }
  });
 this.RecoveredData.caseNumber = item.caseNumber;   
}

 //approve case method 
approveRecoveredCases(): void {
  // Ensure caseNumber is valid
  if (!this.RecoveredData.caseNumber) {
    console.error('Case number is undefined or empty.');
    return;
  }

  // Validate the approval message
  if (!this.approvalMessage.trim()) {
    this.errorMessage = 'The Approval Message field is required.';
    return;
  }

  // Constructing the data object to be submitted
  const approveRecoveredData = {
    CaseNumber: this.RecoveredData.caseNumber,
    ApproverRemarks: this.approvalMessage // Include the approval message
  };

  console.log('Case Data to be Submitted:', approveRecoveredData);
  this.loading = true; // Indicate loading state

  // Attempt to approve the case
  this.sharedService.approveRecoveredCases(approveRecoveredData).subscribe(
    (response: any) => {
      console.log('Response received:', response);
      this.loading = false; // Reset loading state upon success
      this.successMessage = 'Recovery Case approved successfully!';
      this.responseMessage = response.message; // Set the response message
      this.toastr.success('Recovery Case approved successfully!', 'Success');
      this.isApprovalVisible = false; // Hide the approval textarea
      this.approvalMessage = ''; // Reset the approval message
    },
    (error: any) => {
      this.loading = false; // Reset loading state upon failure
      console.error('Error approving case:', error);
      this.errorMessage = 'Failed to approve case. Please try again.';
      this.toastr.error('Failed to approve case. Please try again.', 'Error');
    }
  );
}




     // functionality for reject case 
  submitRejection() {
    if (!this.rejectionMessage.trim()) {
      this.errorMessage = 'The Rejection Message field is required.';
      return;
    }
    // Handle rejection logic here
    this.loading = true;
    // Simulate an API call
    setTimeout(() => {
      this.loading = false;
      this.responseMessage = 'Case rejected successfully';
      this.isRejectionVisible = false;
      this.rejectionMessage = '';
    }, 2000);
  }

  

  
  showApproversTextarea() {
    this.isApprovalVisible = true;
    this.isRejectionVisible = false;
    this.errorMessage = '';
  }


}
