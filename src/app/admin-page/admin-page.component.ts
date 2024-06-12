
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
  
  

  
  searchText: string = '';
 

  currentPage: number = 1;
  pageSize: number = 6;
  totalItems: number = 0;

  constructor(private modalService: BsModalService, private empService: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployeeList();

    this.getroles();

  }

  updateSelectedUserData() {
    const selectedUser = this.dataSource.find(user => user.email === this.selectedUser);
    if (selectedUser) {
      this.selectedUserPf = selectedUser.pfNumber;
      this.selectedUserName = selectedUser.fullName;
    }

  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.updatePagination();

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

        this.dataSource = res.result;
        this.totalItems = this.dataSource.length;
        this.updatePagination();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.trim() === '') {
      this.dataSourceFiltered = this.dataSource;
    } else {


      this.dataSourceFiltered = this.dataSource.filter(item =>
        item.fullName.toLowerCase().includes(filterValue) ||
        item.pfNumber.toLowerCase().includes(filterValue) ||
        item.email.toLowerCase().includes(filterValue)
      );
    }
    this.totalItems = this.dataSourceFiltered.length;
    this.updatePagination();
  }


  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSourceFiltered = this.dataSource.slice(startIndex, endIndex);
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


  getroles() {
    this.empService.getroles().subscribe({
      next: (res: any) => {
        if (res.result && Array.isArray(res.result)) {

          this.roles = res.result;

        } else {
          console.error('Unexpected response format:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }


  saveRoleAssignment() {
    if (this.selectedUser && this.selectedRole) {
      const selectedUserEmail = this.dataSource.find(user => user.email === this.selectedUser).email;
      this.empService.assignRole(selectedUserEmail, this.selectedRole).subscribe({
        next: (res) => {
          showSuccessToast('Role assigned successfully!');

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


  activateUser() {
    if (this.selectedUser) {
      this.empService.activateUser(this.selectedUser).subscribe({
        next: (res) => {

          showSuccessToast('User activated successfully!');
          this.getEmployeeList();

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

          showSuccessToast('User deactivated successfully!');
          this.getEmployeeList();

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
