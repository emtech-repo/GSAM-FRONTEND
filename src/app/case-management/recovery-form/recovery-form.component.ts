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
  decisionDetails: any;

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

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
