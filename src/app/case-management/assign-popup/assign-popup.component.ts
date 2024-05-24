import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-assign-popup',
  templateUrl: './assign-popup.component.html',
  styleUrls: ['./assign-popup.component.css']
})
export class AssignPopupComponent implements OnInit {
  @Input() caseNumber: string | undefined;
  UserName: string = '';
  responseMessage: string | undefined;

  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // You can use this.caseNumber here to display in the HTML
  }

  assignCase(): void {
    console.log('Data to send to assign case:', { caseNumber: this.caseNumber, UserName: this.UserName });
    // Send data to API using SharedService
    this.sharedService.assignCase(this.caseNumber!, this.UserName).subscribe(
      (response) => {
        // Handle successful response
        console.log('API response:', response);
        this.responseMessage = response.message; // Assuming the response has a message field
        // Show success message or perform other actions
        this.toastr.success('Data sent successfully', 'Success');
      },
      (error) => {
        // Handle error
        console.error('Failed to send data to API:', error);
        this.responseMessage = 'Failed to assign case'; // Set a default error message
        // Show error message or perform other actions
        this.toastr.error('Failed to send data to API', 'Error');
        // Close modal after a delay
        setTimeout(() => {
          this.bsModalRef.hide();
        }, 30000000); // Adjust delay as needed
      }
    );
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
