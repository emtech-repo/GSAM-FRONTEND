// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { SharedService } from '../shared.service';
// import { trigger, transition, style, animate } from '@angular/animations'; // Import necessary functions from @angular/animations

// @Component({
//   selector: 'app-admin-popup',
//   templateUrl: './admin-popup.component.html',
//   styleUrls: ['./admin-popup.component.css'],
//   animations: [
//     trigger('flyInOut', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('300ms', style({ opacity: 1 }))
//       ]),
//       transition(':leave', [
//         animate('300ms', style({ opacity: 0 }))
//       ])
//     ])
//   ]
// })
// export class AdminPopupComponent implements OnInit {
//   constructor(
//     private fb: FormBuilder,
//     private service: SharedService,
//     private toastr: ToastrService,
//     public dialogRef: MatDialogRef<AdminPopupComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) { }

//   ngOnInit(): void {
//     if (this.data.usercode) {
//       this.loadUserData(this.data.usercode);
//     }
//     this.loadUserRoles();
//   }

//   roleList: any[] = [];
//   editData: any;

//   updateForm = this.fb.group({
//     id: [''],
//     name: ['', Validators.required],
//     password: [''],
//     email: ['', Validators.email],
//     gender: ['male'],
//     role: ['', Validators.required],
//     isActive: [false]
//   });

//   loadUserData(code: any): void {
//     this.service.getUserByCode(code).subscribe(res => {
//       this.editData = res;
//       this.updateForm.patchValue(this.editData);
//     });
//   }

//   loadUserRoles(): void {
//     this.service.getUserRoleList().subscribe(res => {
//       this.roleList = res;
//     });
//   }

//   updateUser(): void {
//     const userId = this.updateForm.value.id;
//     const userData = this.updateForm.value;
//     this.service.updateUser({ id: userId, ...userData }).subscribe(() => {
//       this.toastr.success('User updated successfully.');
//       this.dialogRef.close(true);
//     }, error => {
//       this.toastr.error('Failed to update user.');
//       console.error('Update user error:', error);
//     });
//   }
// }
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
