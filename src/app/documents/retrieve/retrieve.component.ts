import { Component, ViewChild, ElementRef, TemplateRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service'; // Import your SharedService
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent {
  @ViewChild('searchDialog') searchDialog!: ElementRef;
  searchForm: FormGroup; // Define searchForm FormGroup

  constructor(private router: Router, private sharedService: SharedService, @Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal) {
    // Initialize searchForm FormGroup
    this.searchForm = new FormGroup({
      accNumber: new FormControl(''),
      accName: new FormControl(''),
      cifID: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(event?: Event) {
    // Your form submission logic here
  }
  uploadFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Example: Send the file to a backend endpoint
      // // this.http.post('/api/upload', file).subscribe(
      //   response => console.log(response),
      //   error => console.error(error)
      // );
    }
  }
}
