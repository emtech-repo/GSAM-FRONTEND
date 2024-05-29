import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-restructure-form',
  templateUrl: './restructure-form.component.html',
  styleUrl: './restructure-form.component.css'
})
export class RestructureFormComponent {
  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedService: SharedService
  ) { }

  closeModal(): void {
    this.bsModalRef.hide();
  }

}
