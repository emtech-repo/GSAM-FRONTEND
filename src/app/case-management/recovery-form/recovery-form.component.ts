import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.css'
})
export class RecoveryFormComponent {

   loanAccount: string | null = null;
    decisionDetails: any;
    Assigneddata: any = {};

   constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService,
    private route: ActivatedRoute

  ) { }

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loanAccount = params['loanAccount'];
      console.log('Received loan account:', this.loanAccount); // Log the received loan account
      if (this.loanAccount) {
        this.fetchDecisionDetails();
      }
    });
  }

  fetchDecisionDetails(): void {
    this.sharedService.getCaseDetails(this.loanAccount!).subscribe(
      (response: any) => {
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          // Find the case details object with matching loanAccount
          const decisionDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (decisionDetail) {
            this.decisionDetails = decisionDetail;
            console.log('Decision details:', this.decisionDetails); // Console log the fetched case details
          } else {
            console.error('Case details not found for loan account:', this.loanAccount);
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Failed to fetch decision details:', error);
      }
    );
  }




  closeModal(): void {
    this.bsModalRef.hide();
  }



}
