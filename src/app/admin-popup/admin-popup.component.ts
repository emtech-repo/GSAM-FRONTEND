import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css']
})
export class AdminPopupComponent implements OnInit {
  empForm: FormGroup;

  @Input() data: any;
  @Input() onClose!: () => void;

  constructor(
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {
    this.empForm = this.formBuilder.group({
      pfNumber: new FormControl({ value: '', disabled: true }),
      fullName: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      role: new FormControl({ value: '', disabled: true }),
      registeredTime: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue({
        pfNumber: this.data.pfNumber,
        fullName: this.data.fullName,
        email: this.data.email,
        role: this.data.role,
        registeredTime: this.data.registeredTime,
      });
    }
  }

  onCancel() {
    this.modalRef.hide();
    this.onClose();
  }

  get pfNumberControl() {
    return this.empForm.get('pfNumber') as FormControl;
  }

  get fullNameControl() {
    return this.empForm.get('fullName') as FormControl;
  }

  get emailControl() {
    return this.empForm.get('email') as FormControl;
  }
  get roleControl() {
    return this.empForm.get('role') as FormControl;
  }
  get registeredTimeControl() {
    return this.empForm.get('registeredTime') as FormControl;
  }
}
