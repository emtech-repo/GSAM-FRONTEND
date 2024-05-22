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


 
  

  constructor(private modalService: BsModalService,private sharedService: SharedService,private http: HttpClient,private route: ActivatedRoute) { }
 
   bsModalRef: BsModalRef | undefined;


goToAssignPopup() {
    //  this.router.navigate(['/assign-popup']);
    
    this.bsModalRef = this.modalService.show(AssignPopupComponent); // Open modal and get modal reference
  }
 
  searchQuery: string = '';
  searchTerm: string = '';
  UnAssigneddata: any[] = []; 
  

   currentPage: number = 1;
  pageSize: number = 10;
   UnAssignedUrl: string = '';

 


   ngOnInit(): void {
    // Retrieve the selected row data from the route parameter
    this.route.params.subscribe(params => {
      this.selectedRowData = JSON.parse(params['selectedRow']);
    });
  }
 

   UnAssigned(): void {
    this.http.get<any>(this.UnAssignedUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.UnAssigneddata = response.result;

      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  

}
