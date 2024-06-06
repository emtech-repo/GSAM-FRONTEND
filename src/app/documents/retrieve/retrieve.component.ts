
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  uploadForm: FormGroup;
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
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private sharedserv: SharedService
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
    if (this.searchValue) {
      this.filteredLoanData = this.LoanData.filter(loan =>
        loan[this.searchParam]?.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.filteredLoanData = [...this.LoanData];
    }
    // this.updateCounts(this.filteredLoanData);
    

  
  }
  

  
  fetchDocuments() {
    this.sharedserv.getAllDocuments().subscribe(
      (response: any) => { // Ensure response is properly typed
        if (Array.isArray(response.result)) {
          this.recentFiles = response.result;
          this.updateCounts(response.result);
           // Update recentFiles after fetching documents
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
          uploadDate: new Date()
          this.uploadForm.reset();
        
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

  updateCounts(documents: any[]) {
    // Reset the counts
    this.folderCounts = {
      'Collateral': 0,
      'Personal Documents': 0,
      'Contracts': 0,
      'Litigation': 0
    };

    documents.forEach(doc => {
      if (this.folderCounts[doc.folder] !== undefined) {
        this.folderCounts[doc.folder]++;
      }
    });

    this.totalFilesCount = documents.length;
    this.totalRecentFilesCount = documents.length;
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
    // Logic to view the document
    console.log('Viewing document:', file);
  }

  
}
    
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Subscription } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SharedService } from '../../shared.service';
// import { takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';

// @Component({
//   selector: 'app-retrieve',
//   templateUrl: './retrieve.component.html',
//   styleUrls: ['./retrieve.component.css']
// })
// export class RetrieveComponent implements OnInit, OnDestroy {
//   private destroy$ = new Subject<void>();
//   uploadForm: FormGroup;
//   loading: boolean = false;
//   fileName: string = '';
//   successMessage: string | null = null;
//   errorMessage: string | null = null;
//   folders: string[] = ['Collateral', 'Personal Documents', 'Contracts', 'Litigation'];
//   recentFiles: any[] = [];
//   folderCounts: { [key: string]: number } = {
//     'Collateral': 0,
//     'Personal Documents': 0,
//     'Contracts': 0,
//     'Litigation': 0
//   };
//   totalFilesCount: number = 0;
//   totalRecentFilesCount: number = 0;
//   LoanData: any[] = [];
//   filteredLoanData: any[] = [];
//   selectedLoan: any;
//   searchParam: string = 'acid'; // Default search parameter
//   searchValue: string = '';
//   searchCommitted: boolean = false;
//   private subscriptions: Subscription = new Subscription();

//   constructor(
//     private formBuilder: FormBuilder,
//     private modalService: NgbModal,
//     private http: HttpClient,
//     private sharedserv: SharedService
//   ) {
//     this.uploadForm = this.formBuilder.group({
//       loanAccount: ['', Validators.required],
//       fileName: ['', Validators.required],
//       fileType: ['', Validators.required],
//       fileExtension: ['', Validators.required],
//       file: [null, Validators.required],
//       folder: ['', Validators.required],
//       accountName: ['', Validators.required],
//       selectedFolder: [''],
//       // createdOn: [new Date()], 
//     });
//   }

//   ngOnInit() {
//     this.fetchDocuments();
//     this.getLoan();

//     this.subscriptions.add(
//       this.uploadForm.get('selectedFolder')?.valueChanges.subscribe(selectedFolder => {
//         this.uploadForm.patchValue({ folder: selectedFolder });
//       })
//     );
//   }
  
//   onSelectLoan(loan: any) {
//     this.uploadForm.patchValue({
//       loanAccount: loan.acid, // Update the form field with loan account
//       accountName: loan.account_name // Update the form field with account name
//     });
//   }

//   ngOnDestroy() {
//     this.subscriptions.unsubscribe();
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
  
//   getLoan(): void {
//     this.sharedserv.getLoan().pipe(takeUntil(this.destroy$)).subscribe(
//       (response: any) => {
//         console.log('Loan Data:', response.entity); // For debugging
//         this.LoanData = response.entity; // Assuming 'entity' is an array of loan objects
//       },
//       (error) => {
//         console.error('Error fetching loan data:', error);
//       }
//     );
//   }

//   search(): void {
//     console.log('Search method called'); // For debugging
//     this.searchCommitted = true;
//     if (this.searchValue) {
//       this.filteredLoanData = this.LoanData.filter(loan =>
//         loan[this.searchParam]?.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       );
//     } else {
//       this.filteredLoanData = [...this.LoanData];
//     }
//     this.updateCounts(this.filteredLoanData);
//     this.updateRecentFilesCount();
//   }
  
//   fetchDocuments() {
//     this.sharedserv.getAllDocuments().subscribe(
//       (response: any) => { // Ensure response is properly typed
//         if (Array.isArray(response.result)) {
//           this.recentFiles = response.result;
//           this.updateCounts(this.recentFiles); // Initial update counts based on recentFiles
//         } else {
//           console.error('Error: Response result is not an array', response);
//         }
//       },
//       (error) => {
//         console.error('Error fetching documents:', error);
//       }
//     );
//   }

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     this.uploadForm.patchValue({
//       file: file,
//       fileName: file.name,
//       fileType: file.type,
//       fileExtension: file.name.split('.').pop()
//     });
//   }

//   onSubmit() {
//     if (this.uploadForm.valid) {
//       this.loading = true;
//       this.successMessage = null;
//       this.errorMessage = null;
    
//       const formValues = this.uploadForm.value;
//       this.sharedserv.uploadDocument(
//         formValues.file,
//         formValues.loanAccount,
//         formValues.fileName,
//         formValues.fileType,
//         formValues.folder,
//         formValues.fileExtension,
//         formValues.accountName
//       ).subscribe(
//         (response) => {
//           this.loading = false;
//           this.successMessage = response.message;
//           this.fetchDocuments(); // Refresh documents list after successful upload
//           this.uploadForm.reset();
//         },
//         (error) => {
//           this.loading = false;
//           if (error.error && error.error.message) {
//             this.errorMessage = error.error.message;
//           } else if (error.message) {
//             this.errorMessage = error.message;
//           } else {
//             this.errorMessage = "An error occurred while uploading the document.";
//           }
//         }
//       );
//     } else {
//       console.error('Form is invalid');
//     }
//   }

//   updateCounts(documents: any[]) {
//     // Reset the counts
//     this.folderCounts = {
//       'Collateral': 0,
//       'Personal Documents': 0,
//       'Contracts': 0,
//       'Litigation': 0
//     };

//     documents.forEach(doc => {
//       if (this.folderCounts[doc.folder] !== undefined) {
//         this.folderCounts[doc.folder]++;
//       }
//     });

//     this.totalFilesCount = documents.length;
//   }
  
//   updateRecentFilesCount() {
//     this.totalRecentFilesCount = this.recentFiles.filter(file =>
//       this.filteredLoanData.some(loan => loan.acid === file.loanId)
//     ).length;
//   }

//   downloadDocument(file: any) {
//     fetch(file.documentsUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok ${response.statusText}`);
//         }
//         // Get the MIME type from the response headers
//         const contentType = response.headers.get('content-type');
//         // Create a Blob with the detected MIME type
//         return response.blob().then(blob => ({ blob, contentType }));
//       })
//       .then(({ blob, contentType }) => {
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         // Set the downloaded file's name
//         a.download = file.fileName || 'downloaded_file'; // Fallback name if file.fileName is not available
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       })
//       .catch(error => {
//         console.error('Error downloading file:', error);
//       });
//   } 

//   viewDocument(file: any): void {
//     // Logic to view the document
//     console.log('Viewing document:', file);
//   }
// }
