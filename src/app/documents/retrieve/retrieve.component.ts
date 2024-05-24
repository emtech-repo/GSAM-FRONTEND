import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit, OnDestroy {
  uploadForm!: FormGroup;
  folders = ['Personal Documents', 'Litigation', 'Collaterals', 'Contracts'];
  selectedFolder: string = '';
  private fileCountsSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder here
    private modalService: NgbModal,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    // Initialize the form in ngOnInit
    this.initUploadForm();
  }

  ngOnDestroy() {
    if (this.fileCountsSubscription) {
      this.fileCountsSubscription.unsubscribe();
    }
  }

  initUploadForm(): void {
    this.uploadForm = this.formBuilder.group({
      file: [null, Validators.required],
      folder: [this.selectedFolder, Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required]
    });
  }

  openModal(content: any, folder: string): void {
    this.selectedFolder = folder;
    this.uploadForm.patchValue({ folder: folder });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('folder', this.uploadForm.get('folder')!.value);
    formData.append('accountName', this.uploadForm.get('accountName')!.value);
    formData.append('accountNumber', this.uploadForm.get('accountNumber')!.value);
    formData.append('file', this.uploadForm.get('file')!.value);

    this.sharedService.uploadDocument(formData).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., display a success message
      },
      error => {
        console.error('Error uploading file:', error);
        // Handle error, e.g., display an error message
      }
    );
  }
}
