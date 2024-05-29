import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignPopupComponent } from '../assign-popup/assign-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {

  bsModalRef: BsModalRef | undefined;
  loanAccount: string | null = null;
  caseDetails: any;
  UnAssigneddata: any = {};

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loanAccount = params['loanAccount'];
      console.log('Received loan account:', this.loanAccount); // Log the received loan account
      if (this.loanAccount) {
        this.fetchCaseDetails();
      }
    });
  }

  fetchCaseDetails(): void {
    this.sharedService.getCaseDetails(this.loanAccount!).subscribe(
      (response: any) => {
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          // Find the case details object with matching loanAccount
          const caseDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (caseDetail) {
            this.caseDetails = caseDetail;
            console.log('Case details:', this.caseDetails); // Console log the fetched case details
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



    requestData = {
      caseNumber: this.UnAssigneddata?.caseNumber ?? '',
      // CifId: this.UnAssigneddata?.CifId ?? '',
      // accountName: this.UnAssigneddata?.accountName ?? '',
      // loanAmount: this.UnAssigneddata?.loanAmount ?? '',
      // loanTenure: this.UnAssigneddata?.loanTenure ?? '',
      // solId: this.UnAssigneddata?.solId ?? '',
      // loanBalance: this.UnAssigneddata?.loanBalance ?? '',
      // loanAccount: this.UnAssigneddata?.loanAccount ?? '',
      // syndicatedFlag: this.UnAssigneddata?.syndicatedFlag ?? '',
      // verifiedFlag: this.UnAssigneddata?.verifiedFlag ?? '', 
      // assigned: this.UnAssigneddata?.assigned ?? '', 
      assignedEmail: this.UnAssigneddata?.assignedEmail ?? '', 
      // statusActive: this.UnAssigneddata?.statusActive ?? ''



  };


  
  goToAssignPopup(caseNumber: string): void {
    
    // Open assign popup and pass case details
    this.bsModalRef = this.modalService.show(AssignPopupComponent, {
      initialState: {
        caseNumber: caseNumber
      }
    });
  }
 goToAssignCase(): void {
    
    // Navigate to the "case-details" route and pass the selected row data as a parameter
    this.router.navigate(['/app-create-case']);
  }

}