import { Component } from '@angular/core';
import { AssignPopupComponent } from '../assign-popup/assign-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {  OnInit } from '@angular/core';




@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.css'
})
export class CaseDetailsComponent  implements OnInit  {
   totalItems: number = 0;
  selectedItem: any;
  selectedRowData: any;
  searchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
   UnAssigneddata: any = {}; // Initialize as an empty object

 



  constructor(private modalService: BsModalService,private sharedService: SharedService,private http: HttpClient,private route: ActivatedRoute) { }
 bsModalRef: BsModalRef | undefined;


  goToAssignPopup() {
    //  this.router.navigate(['/assign-popup']);
    this.bsModalRef = this.modalService.show(AssignPopupComponent); // Open modal and get modal reference
  }
 


  //  ngOnInit(): void {
  //   // Retrieve the selected row data from the route parameter
  //   this.route.params.subscribe(params => {
  //     this.selectedRowData = JSON.parse(params['selectedRow']);
  //   });
  // }
  ngOnInit(): void {
  // Assuming the selected row data is passed as a query parameter named 'selectedRow'
  this.route.queryParams.subscribe(params => {
    if (params['selectedRow']) {
      this.UnAssigneddata = (decodeURIComponent(params['selectedRow']));
    }
  });
}
    //  requestData = {
    //   CifId: this. UnAssigneddata?.CifId ?? '',
    //   accountName: this. UnAssigneddata?.accountName ?? '',
    //   loanAmoun: this. UnAssigneddata?. loanAmount ?? '',
    //   loanTenure: this. UnAssigneddata?.loanTenure ?? '',
    //   SolId: this. UnAssigneddata?.SolId ?? '',
    //   LoanBalance: this. UnAssigneddata?. LoanBalance ?? '',
    //   LoanAccount: this. UnAssigneddata?.loanAccount ?? '',
    //   SyndicatedFlag: this. UnAssigneddata?.SyndicatedFlag ?? ''
    // };


  

  

}
