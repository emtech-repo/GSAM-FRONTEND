import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-restructure-form',
  templateUrl: './restructure-form.component.html',
  styleUrl: './restructure-form.component.css'
})
export class RestructureFormComponent  implements OnInit{
 @Input() loanAccount: string | null = null; // Use Input decorator
 decisionDetails = {
    loanAccount: '',
    caseNumber: '',
    loanAmount: '',
    cifId: '',
    accountName: '',
    solId: '',
    loanBalance: '',
     loanTenure: '',
  };

 
  comments: string = '';
  InitialInstalments: string = '';
   NewInstalments: string = '';
 NewLoanTenure: string = '';
  responseMessage: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  
  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    if (this.loanAccount) {
      console.log('Received loan account:', this.loanAccount); // Log the received loan account
      this.fetchDecisionDetails();
    } else {
      console.error('Loan account is not defined');
    }
  }

  fetchDecisionDetails(): void {
    this.sharedService.getDecisionDetails(this.loanAccount!).subscribe(
      (response: any) => {
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          // Find the case details object with matching loanAccount
          const decisionDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (decisionDetail) {
            this.decisionDetails = decisionDetail;
            console.log('Case details:', this.decisionDetails); // Console log the fetched case details
          } else {
            console.error('Case details not found for loan account:', this.loanAccount);
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Failed to fetch case details:', error);
      }
    );
  }

   submitRestructure(): void {
    const restructureData = {
      LoanAccount: this.decisionDetails.loanAccount,
      CaseNumber: this.decisionDetails.caseNumber,
      LoanAmount: this.decisionDetails.loanAmount,
      CifID: this.decisionDetails.cifId,
      AccountName: this.decisionDetails.accountName,
      SolId: this.decisionDetails.solId,
      LoanBalance: this.decisionDetails.loanBalance,
      LoanTenure: this.decisionDetails.loanTenure,

      InitialInstalments: this.InitialInstalments,
      NewInstalments: this.NewInstalments,
      Comments: this.comments,
      NewLoanTenure: this.NewLoanTenure


    };

    console.log('Restructure Data to be Submitted:', restructureData);
    this.loading = true;

    this.sharedService. submitRestructure(restructureData).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        this.loading = false;
        this.successMessage = 'Restructure  data submitted successfully!';
        this.toastr.success('Restructure data submitted successfully!', 'Success');
      },
      (error: any) => {
        this.loading = false;
        console.error('Error submitting resructure data:', error);
        this.errorMessage = 'Failed to submit restructure data. Please try again.';
        this.toastr.error('Failed to submit restructure data. Please try again.', 'Error');
      }
    );
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
  }


