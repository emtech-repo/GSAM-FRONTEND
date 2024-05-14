import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-two',
  templateUrl: './create-two.component.html',
  styleUrl: './create-two.component.css'
})
export class CreateTwoComponent {
    CreatedSuccessfully: any;
  action: string | undefined;

    constructor(
     private toastr: ToastrService,
    public bsModalRef: BsModalRef 
  ) { }

  
   closeModal() {
    this.bsModalRef.hide();
  }
CreateCase() {
    console.log('Case Created approved');


    // Set submittedSuccessfully to true and action to 'approve'
    this.CreatedSuccessfully = true;
    this.action = 'Created';

  }
  
  

 
}
