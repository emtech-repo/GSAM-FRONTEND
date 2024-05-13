import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CreateCaseComponent } from '../create-case/create-case.component';




@Component({
  selector: 'app-loan-account-look-up',
  templateUrl: './loan-account-look-up.component.html',
  styleUrl: './loan-account-look-up.component.css'
})
export class LoanAccountLookUpComponent implements OnInit {
  loanDetails: any;
  atmData!: MatTableDataSource<any>;
  loandata: any;
  recentActivityData: any[] = [];
  pagedLoanData: any;

  SearchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  selectedItem: any;


  constructor(
     private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedserv : SharedService 
    
  ) { }

  

  


  ngOnInit(): void {
    this.fetchRecentActivity();

    console.log(this.filteredData, "filterd data")
  }

  fetchRecentActivity(): void {
    this.sharedserv.getAccounts().subscribe(data => {
        this.loanDetails = data;
        this.loandata = data.entity;
        this.totalItems = this.loandata.length; // Update totalItems
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.recentActivityData = data.entity.slice(startIndex, endIndex);

        console.log(this.recentActivityData, "loan data");
    });
}

  

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentActivity();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchRecentActivity();
  }

  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.recentActivityData.filter(item => {
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.recentActivityData;
    }
  }

  onRowClick(selectedItem: any) {
this.selectedItem = selectedItem;
    this.bsModalRef.hide( );
        console.log('Selected item:', selectedItem);
        // Here you can handle the selected item, e.g., display its details, update a model, etc.
    }
}





 

