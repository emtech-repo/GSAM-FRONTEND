import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrl: './assign-case.component.css'
})
export class AssignCaseComponent {

    showUnassignedCasesFlag: boolean = true;
    showAssignedCasesFlag: boolean = true; 

    recentActivityData: any[] = [];
  modalService: any;

  constructor(private router: Router,private sharedService: SharedService,private toastr: ToastrService,
    public bsModalRef: BsModalRef) { }

  goToCaseDetails() {
    // Navigate to the "case-details" route
    this.router.navigate(['/case-details']);
  }
  
  

 searchOption: string = 'assignedTo';

  searchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalCases: number = 0;
  assignedCases: number = 0;
  unassignedCases: number = 0;
  searchParams = { param: '', value: '' }
  statusData: any[] = []; // Your data array
  cd: any;

 
  setSearchOption(option: string) {
    this.searchOption = option;
  }
  search(): void {
    console.log('Search method called'); // Debugging line
    this.currentPage = 1; // Reset current page for search
    this.statusData = this.statusData.filter(item => {
      switch (this.searchParams.param) {
        case 'cifId':
          return item.cifId.toLowerCase().includes(this.searchParams.value.toLowerCase());
        case 'assignedEmail':
          return item.assignedEmail.toLowerCase().includes(this.searchParams.value.toLowerCase());
        case 'accountName':
          return item.accountName.toLowerCase().includes(this.searchParams.value.toLowerCase());
        case 'loanAccount':
          return item.loanAccount.toLowerCase().includes(this.searchParams.value.toLowerCase());
        default:
          return false;
      }
    });
  }

 


  getStatus(): void {
    this.sharedService.getStatus().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.statusData = result;
        this.calculateCaseCounts(); // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary
      }
    );
  }
  calculateCaseCounts(): void {
    // Reset counts
    this.totalCases = this.statusData.length;
    this.assignedCases = 0;
    this.unassignedCases = 0;

    // Count assigned and unassigned cases
    this.statusData.forEach(item => {
      if (item.assigned === 'Y') {
        this.assignedCases++;
      } else {
        this.unassignedCases++;
      }
    });
  }

 
  


  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getDataArray());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table.xlsx');
  }

  exportToPDF(): void {
    const doc = new jspdf.default();
    const headers = ['Quote#', 'Product', 'Business type', 'Policy holder', 'Premium', 'Status', 'Updated at'];
    const tableData = this.filteredData.map(item => [
      item.userId,
      item.id,
      item.title,
      item.completed,
      // Add other properties here based on your table structure
    ]);

   ;
    doc.save('table.pdf');
  }

  getDataArray(): any[][] {
    const dataArray: any[][] = [];
    const table = document.getElementById('example');
    const rows = table?.querySelectorAll('tr');
    rows?.forEach(row => {
      const rowData: any[] = [];
      row?.querySelectorAll('td').forEach(cell => {
        rowData.push(cell?.textContent?.trim());
      });
      dataArray.push(rowData);
    });
    return dataArray;
  }
 
    closeModal() {
    this.bsModalRef.hide();
  }
    


 
  

 


  getStatus(): void {
    this.sharedService.getStatus().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.statusData = result;
        this.calculateCaseCounts(); // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary
      }
    );
  }
  calculateCaseCounts(): void {
    // Reset counts
    this.totalCases = this.statusData.length;
    this.assignedCases = 0;
    this.unassignedCases = 0;

    // Count assigned and unassigned cases
    this.statusData.forEach(item => {
      if (item.assigned === 'Y') {
        this.assignedCases++;
      } else {
        this.unassignedCases++;
      }
    });
  }

 
  


  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getDataArray());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table.xlsx');
  }

  exportToPDF(): void {
    const doc = new jspdf.default();
    const headers = ['Quote#', 'Product', 'Business type', 'Policy holder', 'Premium', 'Status', 'Updated at'];
    const tableData = this.filteredData.map(item => [
      item.userId,
      item.id,
      item.title,
      item.completed,
      // Add other properties here based on your table structure
    ]);

   ;
    doc.save('table.pdf');
  }

  getDataArray(): any[][] {
    const dataArray: any[][] = [];
    const table = document.getElementById('example');
    const rows = table?.querySelectorAll('tr');
    rows?.forEach(row => {
      const rowData: any[] = [];
      row?.querySelectorAll('td').forEach(cell => {
        rowData.push(cell?.textContent?.trim());
      });
      dataArray.push(rowData);
    });
    return dataArray;
  }
 
    closeModal() {
    this.bsModalRef.hide();
  }
    


 
  


  ngOnInit(): void {
    this.fetchRecentActivity();
  }

  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe((response: any) => { // Specify the type of the response
        if (response && response.statusCode === 200) {
          const result = response.result as any[];
          if (Array.isArray(result)) {
            this.recentActivityData = result.slice(startIndex, endIndex);
            this.totalItems = result.length;
          } else {
            console.error('Error: Data result is not an array.');
          }
        } else {
          console.error('Error: Unexpected status code:', response && response.statusCode);
        }
      }, error => {
        console.error('Error fetching recent activity:', error);
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

   showUnassignedCases() {
        this.showUnassignedCasesFlag = !this.showUnassignedCasesFlag;
    }

   

    showAssignedCases() {
        this.showAssignedCasesFlag = !this.showAssignedCasesFlag;
    } 


    exitPage() {
    this.showAssignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
}

    exit() {
    this.showUnassignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
}



}


