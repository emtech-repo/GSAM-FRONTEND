import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css']
})
export class AdminPopupComponent implements OnInit {
  empForm: FormGroup;
  roleList: string[] = ['officer', 'manager'];

  @Input() data: any;
  @Input() onClose!: () => void;

  constructor(
    private empService: SharedService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private toastr: ToastrService // Inject ToastrService
  ) {
    this.empForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      isActive: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        const updatedFields = { ...this.empForm.value };

        if (Object.keys(updatedFields).length === 0) {
          this.toastr.warning('No changes to update.');
          return;
        }

        this.empService.updateEmployee(this.data.id, updatedFields).subscribe({
          next: (val: any) => {
            this.toastr.success('Employee details updated!');
            console.log('Updated fields:', updatedFields);
            this.modalRef.hide();
            this.onClose();
          },
          error: (err: any) => {
            console.error(err);
            this.toastr.error("Error while updating the employee!");
          },
        });
      }
    }
  }

  onCancel() {
    this.modalRef.hide();
    this.onClose();
  }

  
}
