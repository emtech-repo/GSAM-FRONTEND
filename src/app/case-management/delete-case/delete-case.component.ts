import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-delete-case',
  templateUrl: './delete-case.component.html',
  styleUrls: ['./delete-case.component.css']
})
export class DeleteCaseComponent implements OnInit {
  Data = {
    caseNumber: '',
    syndicatedFlag: '',
    loanTenure: '',
    loanAccount: '',
    loanAmount: '',
    cifId: '',
    accountName: '',
    solId: '',
    loanBalance: '',
    verifiedFlag: ''
  };

  searchOption: string = 'assignedTo';
  searchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalCases: number = 0;
  searchParams = { param: '', value: '' };
  pagedCasesdata: any[] = [];
  data: any[] = []; // Your data array
  apiUrl: string = '';
  responseMessage: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  initialLoanTenure!: string;
  initialSyndicatedFlag!: string;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.apiUrl = this.sharedService.ActivityUrl;
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      response => {
        if (response && response.result && Array.isArray(response.result)) {
          this.data = response.result;
          this.totalItems = this.data.length;
          this.filterData();
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
      this.pagedCasesdata = [...this.data];
    } else {
      this.pagedCasesdata = this.data.filter(item =>
        item[this.searchParams.param]?.toString().toLowerCase().includes(this.searchParams.value.toLowerCase())
      );
    }
    this.totalItems = this.pagedCasesdata.length;
    this.updatePagedData();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterData();
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCasesdata = this.data.slice(startIndex, endIndex);
  }

  opendeleteModal(item: any): void {
    const modalForm = document.getElementById('deleteCaseForm') as HTMLFormElement;

    // Autofill input elements
    modalForm.querySelectorAll('input').forEach((input: HTMLInputElement) => {
      const fieldName = input.id;
      if (fieldName && item.hasOwnProperty(fieldName)) {
        input.value = item[fieldName];
        if (fieldName === 'caseNumber') {
          this.Data.caseNumber = item[fieldName];
        }
      }
    });

    // Handle select element for syndicatedFlag
    const syndicatedFlagSelect = modalForm.querySelector('select#syndicatedFlag') as HTMLSelectElement;
    if (syndicatedFlagSelect && item.hasOwnProperty('syndicatedFlag')) {
      syndicatedFlagSelect.value = item.syndicatedFlag;
      this.Data.syndicatedFlag = item.syndicatedFlag;
    }

    // Initialize initial values for loanTenure and syndicatedFlag
    this.Data.loanTenure = item.loanTenure;
    this.initializeModalData();
  }

  // Call this method when the modal opens to store initial values
  initializeModalData(): void {
    this.initialLoanTenure = this.Data.loanTenure;
    this.initialSyndicatedFlag = this.Data.syndicatedFlag;
  }

  deleteCase(): void {
    if (!this.Data.caseNumber) {
      console.error('Case number is undefined or empty.');
      this.toastr.error('Case number is undefined or empty.', 'Error');
      return;
    }

    console.log('Case Number to be Deleted:', this.Data.caseNumber);
    this.loading = true; // Indicate loading state

    this.sharedService.deleteCase(this.Data.caseNumber).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        this.loading = false; // Reset loading state upon success
        this.successMessage = 'Case deleted successfully!';
        this.responseMessage = response.message; // Set the response message
        this.toastr.success('Case deleted successfully!', 'Success');
      },
      (error: any) => {
        this.loading = false; // Reset loading state upon failure
        console.error('Error deleting case:', error);
        this.errorMessage = 'Failed to delete case. Please try again.';
        this.toastr.error('Failed to delete case. Please try again.', 'Error');
      }
    );
  }

  updateCase(): void {
    // Ensure caseNumber is valid
    if (!this.Data.caseNumber) {
      console.error('Case number is undefined or empty.');
      this.toastr.error('Case number is undefined or empty.', 'Error');
      return;
    }

    // Determine which values to use for update
    const loanTenureToUpdate = this.Data.loanTenure !== this.initialLoanTenure ? this.Data.loanTenure : this.initialLoanTenure;
    const syndicatedFlagToUpdate = this.Data.syndicatedFlag !== this.initialSyndicatedFlag ? this.Data.syndicatedFlag : this.initialSyndicatedFlag;

    // Log the current value of SyndicatedFlag and LoanTenure
    console.log('SyndicatedFlag value:', syndicatedFlagToUpdate);
    console.log('LoanTenure value:', loanTenureToUpdate);

    // Logging the case number to be submitted
    console.log('Case Number to be Updated:', this.Data.caseNumber);
    this.loading = true; // Indicate loading state

    // Attempt to update the case
    this.sharedService.updateCase(this.Data.caseNumber, syndicatedFlagToUpdate, loanTenureToUpdate).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        this.loading = false; // Reset loading state upon success
        this.successMessage = 'Case updated successfully!';
        this.responseMessage = response.message; // Set the response message
        this.toastr.success('Case updated successfully!', 'Success');
      },
      (error: any) => {
        this.loading = false; // Reset loading state upon failure
        console.error('Error updating case:', error);
        this.errorMessage = 'Failed to update case. Please try again.';
        this.toastr.error('Failed to update case. Please try again.', 'Error');
      }
    );
  }

  goToCreateCase(): void {
    // Navigate to the "case-details" route and pass the selected row data as a parameter
    this.router.navigate(['/app-create-case']);
  }
}
