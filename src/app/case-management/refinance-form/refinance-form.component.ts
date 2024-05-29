import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-refinance-form',
  templateUrl: './refinance-form.component.html',
  styleUrl: './refinance-form.component.css'
})
export class RefinanceFormComponent {
   constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService
  ) { }

  closeModal(): void {
    this.bsModalRef.hide();
  }


}
