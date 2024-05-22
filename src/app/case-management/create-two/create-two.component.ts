import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-two',
  templateUrl: './create-two.component.html',
  styleUrls: ['./create-two.component.css']
})
export class CreateTwoComponent implements OnInit {
  loanDetails: any = {}; // Initialize as an empty object
  CreatedSuccessfully: boolean = false;
  details: any;
  caseId: number | undefined;
  errorMessage: string = '';




  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    // Access details from the route state
    if (history.state && history.state.details) {
      this.details = history.state.details;
      this.loanDetails = this.details.entity;
      // Log the fetched loanDetails object
      console.log('Loan Details:', this.loanDetails);
    }
  }
  

  closeModal() {
    this.bsModalRef.hide();
  }
    
  goToCreateCase(): void {
    
    // Navigate to the "case-details" route and pass the selected row data as a parameter
    this.router.navigate(['/app-create-case']);
  }


  CreateCase() {
    console.log('Creating Case...');

    // Log the entire loanDetails object for inspection
    console.log('Current loanDetails:', this.loanDetails);


    // Create a new object with only the required fields
    const requestData = {
      CifId: this.loanDetails?.customerCode ?? '',
      AccountName: this.loanDetails?.accountName ?? '',
      LoanAmount: this.loanDetails?.loan?.principalAmount ?? '',
      LoanTenure: this.loanDetails?.loan?.loanPeriodMonths ?? '',
      SolId: this.loanDetails?.solCode ?? '',
      LoanBalance: this.loanDetails?.accountBalance ?? '',
      LoanAccount: this.loanDetails?.acid ?? '',
      SyndicatedFlag: this.loanDetails?.SyndicatedFlag ?? ''
    };

    console.log('Data to be sent:', requestData); // Log the data to be sent

    // Send the request data to the API
    this.sharedService.createCase(requestData)
      .subscribe(response => {
        console.log('Case created successfully:', response);
        this.CreatedSuccessfully = true;
        this.caseId = response.result.caseNumber; // Assuming response.result.caseNumber is the correct path
        this.toastr.success(`Case created successfully Case ID: ${response.result.caseNumber}`, 'Success');
        // Automatically hide the alert after a few seconds
        setTimeout(() => {
          this.CreatedSuccessfully = false;
        }, 5000); // Adjust the timeout duration as needed
      }, error => {
        console.error('Error creating case:', error);
        // Check if the error status is 400 and extract the message from the error response
        if (error.status === 400 && error.error && error.error.message) {
          // Display the error message
          this.toastr.error(error.error.message, 'Error');
        } else {
          // Fallback error message for other cases
          this.toastr.error('Failed to create case. Please try again.', 'Error');
        }
      });
}
}
