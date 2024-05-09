// admin-page.component.ts
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../shared.service';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];


  constructor(
    private modalService: BsModalService,
    private empService: SharedService,
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
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
      next: (res) => {
        this.dataSource = res;
        console.log(res);
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
      this.dataSourceFiltered = this.dataSource.filter(item => item.id.toString().includes(filterValue));
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

  // openEditForm(data: any) {
  //   const modalRef: BsModalRef = this.modalService.show(AdminPopupComponent, { initialState: { data } });
  //   modalRef.content.onClose.subscribe((result: any) => {
  //     if (result) {
  //       this.getEmployeeList();
  //     }
  //   });
  // }

  openEditForm(data: any) {
    const modalRef: BsModalRef = this.modalService.show(AdminPopupComponent, { initialState: { data } });
    modalRef.content.closeBtnName = 'Close';
    modalRef.content.onClose.subscribe((result: any) => {
      if (result) {
        this.getEmployeeList();
      }
    });
  }
}
