import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CreateTwoComponent } from '../create-two/create-two.component';




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
  pageSize: number = 7;
  totalItems: number = 0;
  selectedItem: any;
  modalService: any;


  constructor(
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private sharedserv: SharedService,
    private router: Router,


  ) { }


  goToCreateTwo(acid: any) {
    // Call the API to fetch details using the specific 'acid' as parameter
    this.sharedserv.getLoanDetails(acid).subscribe((details: any) => {
      // Once details are fetched successfully, navigate to the "create two" route
      this.router.navigate(['/app-create-two'], { state: { details: details } });
      // Open modal and get modal reference (if needed)
      this.bsModalRef = this.modalService.show(CreateTwoComponent);
    }, (error: any) => {
      // Handle error if details fetching fails
      console.error('Failed to fetch details:', error);
      // Navigate to the "create two" route without details (optional)
      this.router.navigate(['/app-create-two']);
    });
  }




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



  closeModal() {

    this.bsModalRef.hide();
  }

}