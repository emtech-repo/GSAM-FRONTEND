
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
  documentUrl: SafeResourceUrl | undefined;
  loading: boolean = false;
  fileName: string = '';
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

    console.log('Route Search Param:', routeSearchParam);
    console.log('Route Search Value:', routeSearchValue);

    // Determine the effective search parameters
    const effectiveSearchParam = routeSearchParam || this.searchParam;
    const effectiveSearchValue = routeSearchValue || this.searchValue;

    console.log('Effective Search Param:', effectiveSearchParam);
    console.log('Effective Search Value:', effectiveSearchValue);

    if (effectiveSearchValue) {
      this.filteredLoanData = this.LoanData.filter(loan => {
        if (effectiveSearchParam) {
          const searchField = loan[effectiveSearchParam];
          if (searchField != null) {
            const fieldString = searchField.toString().toLowerCase();
            console.log('Field String:', fieldString);
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
  onSubmit() {
    if (this.uploadForm.valid) {
      this.loading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValues = this.uploadForm.value;
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

          // Assuming the response contains the URL of the uploaded document
          const documentUrl = response.documentUrl;
          console.log('Uploaded Document URL:', documentUrl);
          this.displayDocument(documentUrl);
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

  displayDocument(url: string) {
    
    const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.documentUrl = safeUrl;
    console.log('Sanitized Document URL:', this.documentUrl);
  }

  // onSubmit() {
  //   if (this.uploadForm.valid) {
  //     this.loading = true;
  //     this.successMessage = null;
  //     this.errorMessage = null;
    

  //     const formValues = this.uploadForm.value;
  //     this.sharedserv.uploadDocument(
  //       formValues.file,
  //       formValues.loanAccount,
  //       formValues.fileName,
  //       formValues.fileType,
  //       formValues.folder,
  //       formValues.fileExtension,
  //       formValues.accountName
        
  //     ).subscribe(
  //       (response) => {
  //         this.loading = false;
  //         this.successMessage = response.message;
  //         this.fetchDocuments(); // Refresh documents list after successful upload
  //         uploadDate: new Date()
  //         this.uploadForm.reset();
        
  //       },
  //       (error) => {
  //         this.loading = false;
  //         if (error.error && error.error.message) {
  //           this.errorMessage = error.error.message;
  //         } else if (error.message) {
  //           this.errorMessage = error.message;
  //         } else {
  //           this.errorMessage = "An error occurred while uploading the document.";
  //         }
  //       }
  //     );
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

  updateCounts(documents: any[]) {
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
    
   
    this.totalFilesCount = this.recentFiles.length;
    this.totalRecentFilesCount = this.recentFiles.length;
  }
  
  downloadDocument(file: any) {
    fetch(file.documentsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        // Get the MIME type from the response headers
        const contentType = response.headers.get('content-type');
        // Create a Blob with the detected MIME type
        return response.blob().then(blob => ({ blob, contentType }));
      })
      .then(({ blob, contentType }) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // Set the downloaded file's name
        a.download = file.fileName || 'downloaded_file'; // Fallback name if file.fileName is not available
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
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
