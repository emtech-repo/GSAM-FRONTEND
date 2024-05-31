import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.css']
})
export class RecoveryFormComponent implements OnInit {

  @Input() loanAccount: string | null = null; // Use Input decorator

  decisionDetails = {
    loanAccount: '',
    caseNumber: '',
    loanAmount: '',
    cifId: '',
    accountName: '',
    solId: '',
    loanBalance: ''
  };

  LoanPaid: number | null = null;
  monthsInDefault: number | null = null;
  comments: string = '';
  responseMessage: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.loanAccount) {
      this.fetchDecisionDetails();
    } else {
      console.error('Loan account is not defined');
    }
  }

  fetchDecisionDetails(): void {
    this.sharedService.getDecisionDetails(this.loanAccount!).subscribe(
      (response: any) => {
        console.log('Response from getDecisionDetails:', response);
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          const decisionDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (decisionDetail) {
            this.decisionDetails = decisionDetail;
          } else {
            this.errorMessage = 'Case details not found for the provided loan account.';
            console.error('Case details not found for loan account:', this.loanAccount);
          }
        } else {
          this.errorMessage = 'Invalid response format received.';
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        this.errorMessage = 'Failed to fetch case details due to a network error.';
        console.error('Failed to fetch case details:', error);
      }
    );
  }

  submitRecovery(): void {
    const recoveryData = {
      LoanAccount: this.decisionDetails.loanAccount,
      CaseNumber: this.decisionDetails.caseNumber,
      LoanAmount: this.decisionDetails.loanAmount,
      CifId: this.decisionDetails.cifId,
      AccountName: this.decisionDetails.accountName,
      SolId: this.decisionDetails.solId,
      LoanBalance: this.decisionDetails.loanBalance,
      LoanPaid: this.LoanPaid,
      MonthsInDefault: this.monthsInDefault,
      Comments: this.comments
    };

    console.log('Recovery Data to be Submitted:', recoveryData);
    this.loading = true;

    this.sharedService.submitRecovery(recoveryData).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        this.loading = false;
        this.successMessage = 'Recovery data submitted successfully!';
        this.toastr.success('Recovery  datasubmitted successfully!', 'Success');
      },
      (error: any) => {
        this.loading = false;
        console.error('Error submitting recovery data:', error);
        this.errorMessage = 'Failed to submit recovery data. Please try again.';
        this.toastr.error('Failed to submit recovery data. Please try again.', 'Error');
      }
    );
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
