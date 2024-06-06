import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../shared.service';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  empForm!: FormGroup;
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];
  
  roles: { id: string, name: string }[] = [];
  selectedUser: any; 
  selectedUserPf!: string;
  selectedUserName!: string;
  selectedRole: any
  
  


  constructor(private modalService: BsModalService, private empService: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployeeList();
    // Initialize dataSourceFiltered with dataSource to display data immediately
    this.dataSourceFiltered = [...this.dataSource];
    this.getroles();
    
  }

  updateSelectedUserData() {
    const selectedUser = this.dataSource.find(user => user.email === this.selectedUser);
    if (selectedUser) {
      this.selectedUserPf = selectedUser.pfNumber;
      this.selectedUserName = selectedUser.fullName;
    }
  }

  openAddEditEmployeeDialog() {
    const modalRef: BsModalRef = this.modalService.show(AdminPopupComponent);
    modalRef.content.onClose.subscribe((result: any) => {
      if (result) {
        this.getEmployeeList();
      }
    });
  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.dataSource = res.result; // Assign res.result to dataSource
        // Update dataSourceFiltered to reflect the new data
        this.dataSourceFiltered = [...this.dataSource];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    if (filterValue.trim() === '') {
      // If the input value is empty, show the original data
      this.dataSourceFiltered = this.dataSource;
    } else {
      // Otherwise, filter the original data based on the input value
      this.dataSourceFiltered = this.dataSource.filter(item =>
        item.fullName.toLowerCase().includes(filterValue) ||
        item.pfNumber.toLowerCase().includes(filterValue) ||
        item.email.toLowerCase().includes(filterValue)
      );
    }
  }

  deleteEmployee(id: number) {
    let confirm = window.confirm("Do you want to delete this employee?");
    if (confirm) {
      this.empService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert('Employee deleted!');
          this.getEmployeeList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    const modalRef: BsModalRef = this.modalService.show(AdminPopupComponent, { initialState: { data } });
    modalRef.content.closeBtnName = 'Close';
    modalRef.content.onClose.subscribe((result: any) => {
      if (result) {
        this.getEmployeeList();
      }
    });
  }



//fetch roles

  getroles() {
    this.empService.getroles().subscribe({
      next: (res: any) => {
        if (res.result && Array.isArray(res.result)) {
          this.roles = res.result; // Ensure roles is set to the array
          // console.log('role',this.roles)
        } else {
          console.error('Unexpected response format:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }


///assign role
  saveRoleAssignment() {
    if (this.selectedUser && this.selectedRole) {
      const selectedUserEmail = this.dataSource.find(user => user.email === this.selectedUser).email;
      console.log('Selected User Email:', selectedUserEmail);

      this.empService.assignRole(selectedUserEmail, this.selectedRole).subscribe({
        next: (res) => {
          console.log (res)
          showSuccessToast('Role assigned successfully!');
          // Additional actions like refreshing the user list if necessary
          // Reload the page after successful role assignment
          // location.reload();
        },
        error: (err) => {
          console.error('Error assigning role:', err);
          showDangerToast('Error assigning role. Please try again.');
        }
      });
    } else {
      showDangerToast('Please select both a user and a role.');
    }
  }

//Activate and dectivate user

  activateUser() {
    if (this.selectedUser) {
      this.empService.activateUser(this.selectedUser).subscribe({
        next: (res) => {
          console.log(res);
          showSuccessToast('User activated successfully!');
          this.getEmployeeList(); // Refresh the employee list if needed
        },
        error: (err) => {
          console.error('Error activating user:', err);
          showDangerToast('Error activating user. Please try again.');
        }
      });
    } else {
      showDangerToast('Please select a user.');
    }
  }

  deactivateUser() {
    if (this.selectedUser) {
      this.empService.deactivateUser(this.selectedUser).subscribe({
        next: (res) => {
          console.log(res);
          showSuccessToast('User deactivated successfully!');
          this.getEmployeeList(); // Refresh the employee list if needed
        },
        error: (err) => {
          console.error('Error deactivating user:', err);
          showDangerToast('Error deactivating user. Please try again.');
        }
      });
    } else {
      showDangerToast('Please select a user.');
    }
  }



}
