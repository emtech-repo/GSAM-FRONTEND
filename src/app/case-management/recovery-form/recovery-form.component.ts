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

  LoanPaid : number | null = null;
  monthsInDefault: number | null = null;
  comments: string = '';
  responseMessage: string = '';
 submittedSuccessfully: any;

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
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          const decisionDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (decisionDetail) {
            this.decisionDetails = decisionDetail;
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

  submitRecovery(): void {
    const recoveryData = {
      LoanAccount: this.decisionDetails.loanAccount,
      CaseNumber: this.decisionDetails.caseNumber,
      LoanAmount: this.decisionDetails.loanAmount,
      CifId: this.decisionDetails.cifId,
      AccountName: this.decisionDetails.accountName,
      SolId: this.decisionDetails.solId,
      LoanBalance : this.decisionDetails.loanBalance,
     LoanPaid: this.LoanPaid,
     MonthsInDefault: this.monthsInDefault,
      Comments: this.comments
    };

    this.sharedService.submitRecovery(recoveryData).subscribe(
      (response: any) => {
        this.toastr.success(`Recovery data submitted successfully : ${response.result.caseNumber}`, 'Success');
        this.closeModal();
      },
      (error: any) => {
        console.error('Error submitting recovery:', error);
        this.toastr.error('Failed to submit recovery. Please try again.', 'Error');
      }
    );
     this.submittedSuccessfully = true;
     
    console.log('Recovery Data Submitted:', recoveryData);
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
