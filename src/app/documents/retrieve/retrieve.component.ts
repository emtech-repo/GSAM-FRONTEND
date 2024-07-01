import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any; 

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit, OnDestroy {
  @ViewChild('viewDocumentModal') viewDocumentModal!: ElementRef;
 
  private destroy$ = new Subject<void>();
  uploadForm: FormGroup;
  // documentUrl: SafeResourceUrl | undefined;
  loading: boolean = false;
  fileName: string = '';
  documentUrl: string | null = null; // Store document URL
  documentFileName: string | null = null; // Store document file name
  successMessage: string | null = null;
  errorMessage: string | null = null;
  folders: string[] = ['Collateral', 'Personal Documents', 'Contracts', 'Litigation'];
  recentFiles: any[] = [];
  folderCounts: { [key: string]: number } = {
    'Collateral': 0,
    'Personal Documents': 0,
    'Contracts': 0,
    'Litigation': 0
  };
  totalFilesCount: number = 0;
  totalRecentFilesCount: number = 0;
   LoanData: any[] = [];
   filteredLoanData: any[] = [];
  selectedLoan: any;
  searchParam: string = 'acid'; // Default search parameter
  searchValue: string = '';
  searchCommitted: boolean = false;
  selectedDocument: any;
  private subscriptions: Subscription = new Subscription();
  elementRef: any;
  showError: boolean =false;
  
  approvedFilesCount: number = 0;
  pendingFilesCount: number = 0;
  rejectedFilesCount: number = 0;
  documents: any[] = [];
  filteredDocuments: any[] = [];
  canUpload = false;


  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private sharedserv: SharedService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.uploadForm = this.formBuilder.group({
      loanAccount: ['', Validators.required],
      fileName: ['', Validators.required],
      fileType: ['', Validators.required],
      fileExtension: ['', Validators.required],
      file: [null, Validators.required],
      folder: ['', Validators.required],
      accountName: ['', Validators.required],
      selectedFolder: [''],
      // createdOn: [new Date()], 
    });
  }

  ngOnInit() {
    this.fetchDocuments();
    this.getLoan();
    this.route.params.subscribe(params => {
      const acid = params['acid'];
      if(acid) {
      this.searchParam = 'acid'; // assuming 'acid' is the parameter name in LoanData
      this.searchValue = acid;
      this.search();
      // Now you have access to the acid parameter passed in the route
      }
    });

    this.subscriptions.add(
      this.uploadForm.get('selectedFolder')?.valueChanges.subscribe(selectedFolder => {
        this.uploadForm.patchValue({ folder: selectedFolder });
      })
    );
  }
  onSelectLoan(loan: any) {
    this.uploadForm.patchValue({
      loanAccount: loan.acid, // Update the form field with loan account
      accountName: loan.account_name // Update the form field with account name
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
 getLoan(): void {
    this.sharedserv.getLoan().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        console.log('Loan Data:', response.entity); // For debugging
        this.LoanData = response.entity; // Assuming 'entity' is an array of loan objects
        // this.filteredLoanData = [...this.LoanData]; // Initially show all data
      },
      (error) => {
        console.error('Error fetching loan data:', error);
      }
    );
  }
  
  search(): void {
    console.log('Search method called'); // For debugging
    this.searchCommitted = true;

    // Get route parameters, if any
    const routeSearchParam = this.route.snapshot.paramMap.get('searchParam');
    const routeSearchValue = this.route.snapshot.paramMap.get('searchValue');

    // console.log('Route Search Param:', routeSearchParam);
    // console.log('Route Search Value:', routeSearchValue);

    // Determine the effective search parameters
    const effectiveSearchParam = routeSearchParam || this.searchParam;
    const effectiveSearchValue = routeSearchValue || this.searchValue;

    // console.log('Effective Search Param:', effectiveSearchParam);
    // console.log('Effective Search Value:', effectiveSearchValue);

    if (effectiveSearchValue) {
      this.filteredLoanData = this.LoanData.filter(loan => {
        if (effectiveSearchParam) {
          const searchField = loan[effectiveSearchParam];
          if (searchField != null) {
            const fieldString = searchField.toString().toLowerCase();
            // console.log('Field String:', fieldString);
            return fieldString.includes(effectiveSearchValue.toLowerCase());
          }
          return false;
        } else {
          return Object.values(loan).some(value =>
            value?.toString().toLowerCase().includes(effectiveSearchValue.toLowerCase())
          );
        }
      });

      // Update recent files based on the search result if needed
      this.recentFiles = this.recentFiles.filter(file =>
        file.loanAccount === effectiveSearchValue
      );
    } else {
      this.filteredLoanData = []; // Clear filtered data if no search value
    }

    console.log('Filtered Loan Data:', this.filteredLoanData);

    this.updateCounts(this.filteredLoanData);
  }
  



  

  
  fetchDocuments() {
    this.sharedserv.getAllDocuments().subscribe(
      (response: any) => { // Ensure response is properly typed
        if (Array.isArray(response.result)) {
          this.recentFiles = response.result;
          this.updateCounts(response.result);
          this.updateCounts(this.recentFiles); // Update counts based on recentFiles
        } else {
          console.error('Error: Response result is not an array', response);
        }
        this.updateCanUpload();
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
      
      
    );
  }
 


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadForm.patchValue({
      file: file,
      fileName: file.name,
      fileType: file.type,
      fileExtension: file.name.split('.').pop()
    });
  }
  updateCanUpload() {
    this.canUpload = this.recentFiles.length === 0;
  }
 
  onSubmit() {
    if (this.uploadForm.valid) {
      this.loading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValues = this.uploadForm.value;
      formValues.VerifiedFlag = 'N';

      this.sharedserv.uploadDocument(
        formValues.file,
        formValues.loanAccount,
        formValues.fileName,
        formValues.fileType,
        formValues.folder,
        formValues.fileExtension,
        formValues.accountName
      ).subscribe(
        (response) => {
          this.loading = false;
          this.successMessage = response.message;
          this.fetchDocuments(); // Refresh documents list after successful upload
          this.uploadForm.reset();
          console.log('Upload Document Response:', response);
          if (response.documentUrl) {
            this.documentUrl = response.documentUrl;
            this.documentFileName = formValues.fileName || 'downloaded_file';
            console.log('Uploaded Document URL:', this.documentUrl);
            console.log('Uploaded Document File Name:', this.documentFileName);
          } else {
            console.error('Upload response did not contain a document URL');
          }

          
        },
        (error) => {
          this.loading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else if (error.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = "An error occurred while uploading the document.";
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  
  

  filterFiles(status: string) {

    if (status === 'all') {
      this.recentFiles = this.documents;
    } else if (status === 'approved') {
      this.recentFiles = this.documents.filter(doc => doc.verifiedFlag === 'Y');
    } else if (status === 'pending') {
      this.recentFiles = this.documents.filter(doc => doc.verifiedFlag === 'N' || doc.rejectedFlag === 'N');
    } else if (status === 'rejected') {
      this.recentFiles = this.documents.filter(doc => doc.rejectedFlag === 'Y');
    }
  }





  updateCounts(documents: any[]) {
    
    this.totalFilesCount = documents.length;
    this.approvedFilesCount = documents.filter(doc => doc.verifiedFlag === 'Y').length;
    this.pendingFilesCount = documents.filter(doc => doc.verifiedFlag === 'N' || doc.rejectedFlag === 'N').length;
    this.rejectedFilesCount = documents.filter(doc => doc.rejectedFlag === 'Y' ).length;

    // Reset the counts
    this.folderCounts = {
      'Collateral': 0,
      'Personal Documents': 0,
      'Contracts': 0,
      'Litigation': 0
    };

   
      this.recentFiles.forEach(file => {
        if (this.folderCounts[file.folder] !== undefined) {
          this.folderCounts[file.folder]++;
        }
    });
    this.pendingFilesCount = documents.filter(doc => doc.verifiedFlag === 'N' && doc.rejectedFlag !== 'Y').length;
   
    this.totalFilesCount = this.recentFiles.length;
    this.totalRecentFilesCount = this.recentFiles.length;
    
  }
  
  

  
  downloadDocument() {
    if (this.documentUrl && this.documentFileName) {
      fetch(this.documentUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const contentType = response.headers.get('content-type');
          return response.blob().then(blob => ({ blob, contentType }));
        })
        .then(({ blob, contentType }) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.documentFileName || 'default_filename.ext';

          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    } else {
      console.error('No document available for download');
    }
  }



  viewDocument(file: any): void {
    console.log('Selected Document:', file); 
    this.selectedDocument = file;// Check if file is correctly passed
    

  }
  handleError(): void {
    console.error('An error occurred while loading the document.');
    // Additional error handling logic here
  }
  clearError(): void {
    this.showError=false;
  }

  
  
}