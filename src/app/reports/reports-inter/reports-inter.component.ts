import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';






@Component({
  selector: 'app-reports-inter',
  templateUrl: './reports-inter.component.html',
  styleUrl: './reports-inter.component.css'
})
export class ReportsInterComponent  {

    
 lService: any;
  recentFiles: any;
  activeTab: string = 'viewContract';
  searchParams: { param: string, value: string } = { param: '', value: '' }; // Initialize searchParams object


 
  setActiveTab(tab: string): void {
    this.activeTab = tab;
     }



   applyFilter(event: any) {
    
  }



  
  

}
