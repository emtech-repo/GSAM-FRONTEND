import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { LoanAccountLookUpComponent } from '../loan-account-look-up/loan-account-look-up.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { CreateTwoComponent } from '../create-two/create-two.component';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {
    @Input() selectedItem: any;
   CreateCase: any [] =[];
loading: any;
    constructor(
    private fb: FormBuilder,
    public dialog:MatDialog,
    public bsModalRef: BsModalRef, 
    private modalService: BsModalService,
    
    private router: Router,
    private sharedService: SharedService) { }
    

 ngOnInit() {
  
  }
  
   
goLoanAccountLookUp() {
    //  this.router.navigate(['/assign-popup']);
    // Navigate to the "admin page" route
    this.bsModalRef = this.modalService.show(LoanAccountLookUpComponent);
    // Open modal and get modal reference
  }
  

goToCreateTwo() {
    //  this.router.navigate(['/assign-popup']);
    // Navigate to the "admin page" route
    this.bsModalRef = this.modalService.show(CreateTwoComponent); // Open modal and get modal reference
  }
   goToHome() {
    // Navigate to the "case decision" route
    this.router.navigate(['/home']);
  }


}

//////////////////////////////////////////////////////////////////////////////////////////

