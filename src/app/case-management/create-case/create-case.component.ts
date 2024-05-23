import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CreateTwoComponent } from '../create-two/create-two.component';
import { LoanAccountLookUpComponent } from '../loan-account-look-up/loan-account-look-up.component';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent {
  selectedFunction: string = 'choose option';
  selectedLoanAccount: string = '';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) { }

  onFunctionChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const target = event.target as HTMLSelectElement;
      this.selectedFunction = target.value;
      this.selectedLoanAccount = ''; // Reset the selected loan account when the function changes


      if (this.selectedFunction === '5') {  // 5 corresponds to "INQUIRE"
         this.router.navigate(['/add-case']);
       
      } else if (this.selectedFunction === '2') { 
         this.router.navigate(['/search-case']); // 2 corresponds to "ADD"
        // Example route for ADD functionality
      }
      // Add other conditions for different options if needed
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCreateTwo() {
    this.bsModalRef = this.modalService.show(CreateTwoComponent); // Open modal and get modal reference
  }

  searchLoanAccount(searchTerm: string) {
    this.bsModalRef = this.modalService.show(LoanAccountLookUpComponent); // Open modal and get modal reference
  }
}
