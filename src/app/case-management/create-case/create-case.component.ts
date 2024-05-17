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
    // Check if event.target is an instance of HTMLSelectElement and not null
    if (event.target instanceof HTMLSelectElement && event.target !== null) {
      const target = event.target as HTMLSelectElement;
      this.selectedFunction = target.value;
      this.selectedLoanAccount = ''; // Reset the selected loan account when the function changes
    }

  }



  goToHome() {
    // Navigate to the "case decision" route
    this.router.navigate(['/home']);
  }

  goToCreateTwo() {
    // Navigate to the "admin page" route
    this.bsModalRef = this.modalService.show(CreateTwoComponent); // Open modal and get modal reference

  }

  searchLoanAccount(searchTerm: string) {
   
    this.bsModalRef = this.modalService.show(LoanAccountLookUpComponent);
    // Open modal and get modal reference


  }

  
}


  
