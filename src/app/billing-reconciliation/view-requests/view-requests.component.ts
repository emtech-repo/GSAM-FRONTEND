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
  // casesData: any[] = [];
  cd: any;
  apiUrl: string = '';
  DeleteRequestUrl: string = '';
  data: any[] = [];
  currentRequest: any = {};
  updatedComments: string = '';
  deleteResponseMessage: string = '';
  message: string = '';
  response: any;

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
      modalMessage.className = `alert ${alertClass}`;
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

  UpdateRequest(): void { }

  DeleteRequest(): void {
    const requestId = this.currentRequest.requestId;
    const deleteUrl = `${this.DeleteRequestUrl}/submitData/DeleteRequest`;

    this.http.post(deleteUrl, { requestId }).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Request deleted successfully!';
        this.showModalMessage(this.message, 'alert-success');
        this.fetchData(); // Refresh the data
        this.modalService.dismissAll(); // Close the modal
      },
      error: (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: `, error.error);
          // Show a generic error message to the user
          this.showModalMessage('Failed to delete the request. Please try again later.', 'alert-danger');
        }
      }
    });
  }

  openModal(request: any, content: any): void {
    this.currentRequest = request;
    this.updatedComments = request.comments;
    this.modalService.open(content, { ariaLabelledBy: 'editRequestModalLabel' });
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
        // this.calculateCaseCounts();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
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

  // Getter for filtered data based on search term
  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.data.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.data;
    }
  }







}
