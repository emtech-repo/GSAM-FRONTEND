
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css']
})
export class AdminPopupComponent implements OnInit {
  roleList: any[] = []; // Assuming this is populated elsewhere
  updateForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', Validators.email],
    gender: ['male'],
    role: ['', Validators.required],
    isActive: [false]
  });

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef // Inject BsModalRef
  ) { }

  ngOnInit(): void {
    // Example: Fetching roles if not passed as input
    // this.service.getRoles().subscribe(roles => {
    //   this.roleList = roles;
    // });
  }

  updateUser(): void {
    if (this.updateForm.valid) {
      const userId = this.updateForm.value.id;
      const userData = this.updateForm.value;
      this.service.updateUser({ id: userId, ...userData }).subscribe(() => {
        this.toastr.success('User updated successfully.');
        this.bsModalRef.hide(); // Hide the modal when update is successful
      }, error => {
        this.toastr.error('Failed to update user.');
        console.error('Update user error:', error);
      });
    }
  }
  closeModal() {
    this.bsModalRef.hide();
  }
}
