
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared.service';
import { response } from 'express';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit, OnDestroy {
  uploadForm: FormGroup;
  loading: boolean = false;
  fileName: string = ''; // Add fileName property
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  folders : string []=['Collateral','Personal Documents','Contracts','Litigation'];


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
      selectedFolder: [''] 
    });

    
      
    
  }

  ngOnInit() {
    this.uploadForm.get('selectedFolder')?.valueChanges.subscribe(selectedFolder => {
      this.uploadForm.patchValue({ folder: selectedFolder });
    });
  
  }

  ngOnDestroy() {
  
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
        formValues.accountName,
        
      ).subscribe(
        (response) => {
          this.loading = false;
          this.successMessage = response.message;
        },
        (error) => {
          this.loading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Assuming error response has a 'message' property
          } else {
            this.errorMessage = "An error occurred while uploading the document."; // Default error message
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }


}
