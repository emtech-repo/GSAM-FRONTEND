import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent {
  Data = {
    requestId: '',
    serviceDate: '',
    comments: '',
    serviceName: '',
   serviceProviderName : '',
  providerPhoneNumber: '',
    status: ''

  }; 
  data: any[] = []; //Your data array
  pagedRequestData: any[] = [];
  searchOption: string = 'assignedTo';
  searchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;
  totalPages: number = 0;
  totalCases: number = 0;
  activeCases: number = 0;
  closedCases: number = 0;
  searchParams = { param: '', value: '' }
  cd: any;
  apiUrl: string = '';
  DeleteRequestUrl: string = '';

  currentRequest: any = {};
  updatedComments: string = '';
  deleteResponseMessage: string = '';
  message: string = '';
  response: any;
  responseMessage: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  initialServiceDate!: string;
  initialComments!: string;

  constructor(private sharedService: SharedService, private http: HttpClient, private modalService: NgbModal,
    private toastr: ToastrService, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.apiUrl = this.sharedService.SubmissionsUrl;
    this.fetchData();

  }

  showModalMessage(message: string, alertClass: string) {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage) {
      modalMessage.innerText = message;
      modalMessage.className =`alert ${alertClass}`;
      modalMessage.style.display = 'block';
    }
  }

  setSearchParams(param: string): void {
    this.searchParams.param = param;
    this.searchParams.value = ''; // Clear the value since we're setting the parameter now
  }



  setSearchOption(option: string) {
    this.searchOption = option;
  }

UpdateRequest(): void {
  // Ensure requestId is valid
  if (!this.Data.requestId) {
    console.error('Request ID is undefined or empty.');
    this.toastr.error('Request ID is undefined or empty.', 'Error');
    return;
  }

  // Determine which values to use for update
  const serviceDateToUpdate = this.Data.serviceDate !== this.initialServiceDate ? this.Data.serviceDate : this.initialServiceDate;
  const commentsToUpdate = this.Data.comments !== this.initialComments ? this.Data.comments : this.initialComments;

  // Log the current value of serviceDate and comments
  console.log('Service Date value:', serviceDateToUpdate);
  console.log('Comments value:', commentsToUpdate);

  // Logging the request ID to be submitted
  console.log('Request ID to be Updated:', this.Data.requestId);
  this.loading = true; // Indicate loading state

  // Attempt to update the request
  this.sharedService.UpdateRequest(this.Data.requestId, commentsToUpdate, serviceDateToUpdate).subscribe(
    (response: any) => {
      console.log('Response received:', response);
      this.loading = false; // Reset loading state upon success
      this.successMessage = 'Request updated successfully!';
      this.responseMessage = response.message; // Set the response message
      this.toastr.success('Request updated successfully!', 'Success');
    },
    (error: any) => {
      this.loading = false; // Reset loading state upon failure
      console.error('Error updating request:', error);
      this.errorMessage = 'Failed to update request. Please try again.';
      this.toastr.error('Failed to update request. Please try again.', 'Error');
    }
  );
}



  deleteRequest(): void {
    if (!this.Data.requestId) {
      console.error('request id undefined or empty.');
      this.toastr.error('request id is undefined or empty.', 'Error');
      return;
    }

    console.log('request id to be Deleted:', this.Data.requestId);
    this.loading = true; // Indicate loading state

    this.sharedService.deleteRequest(this.Data.requestId).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        this.loading = false; // Reset loading state upon success
        this.successMessage = response.message;
        this.responseMessage = response.message; // Set the response message
        this.toastr.success(response.message, 'Success'); // Display the actual response message
      },
      (error: any) => {
        this.loading = false; // Reset loading state upon failure
        console.error('Error deleting case:', error);
        const errorMessage = error.error && error.error.message ? error.error.message : 'Failed to delete case. Please try again.';
        this.errorMessage = errorMessage;
        this.toastr.error(errorMessage, 'Error'); // Display the actual error message
      }
    );
  }



  openModal(item: any) {
    const modalForm = document.getElementById('RequestForm') as HTMLFormElement;
    modalForm.querySelectorAll('input').forEach((input: HTMLInputElement) => {
      const fieldName = input.id;
      if (fieldName && item.hasOwnProperty(fieldName)) {
        input.value = item[fieldName];
        if (fieldName === 'requestId') {
          this.Data.requestId = item[fieldName];
        }
      }
    });
  }


  closeSubmitModal() {
    const modalElement = document.getElementById('approveserviceModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }

  }


  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.data = response.result;
        this.pagedRequestData = [...this.data];
        this.totalItems = this.data.length;
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRequestData = this.pagedRequestData.slice(startIndex, endIndex);
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchData();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.fetchData();
  }









}