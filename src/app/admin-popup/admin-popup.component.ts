import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userData: any;

  roleList: any[] = []; // Assuming this is populated elsewhere
  updateForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    status: ['', Validators.required],
    role: ['', Validators.required],
    isActive: [false]
  });

  constructor(
    private fb: FormBuilder,
    private service: SharedService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef 
  ) { }

  ngOnInit(): void {
    if (this.userData) {
      this.updateForm.patchValue(this.userData); // Populate form with user data
      console.log(this.userData);
    }

    this.fetchRoles();
    console.log(this.roleList);
  }


  fetchRoles() {
    this.service.getRoles().subscribe(roles => {
      this.roleList = roles;
      if (roles.length > 0) {
        this.updateForm.get('role')?.setValue(roles[0].code);
      }
    });
  }



  updateUser(): void {
    if (this.updateForm.valid) {
      const userId = this.updateForm.value.id;
      const userData = this.updateForm.value;
      this.service.updateUser(userId, userData).subscribe(() => {
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
