import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assign-popup',
  templateUrl: './assign-popup.component.html',
  styleUrl: './assign-popup.component.css'
})
export class AssignPopupComponent {

  constructor(
     private toastr: ToastrService,
    public bsModalRef: BsModalRef 
  ) { }

  
   closeModal() {
    this.bsModalRef.hide();
  }

}
