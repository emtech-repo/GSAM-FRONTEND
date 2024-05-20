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
  UnAssignedData: any[] = []; // Your data array
  AssignedData: any[] = []; // Your data array
  casesData: any[] = []; // Your data array
  cd: any;


  constructor(private router: Router,private sharedService: SharedService,private toastr: ToastrService,
    public bsModalRef: BsModalRef) { }

   

    ngOnInit(): void {
    this.getUnAssigned();
    this.getAssigned();
   }
     getAssigned(): void {
     this.sharedService.getAssigned().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.AssignedData = result;
       this.calculateCaseCounts();

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary

      }
    );
  }

   calculateCaseCounts(): void {
    // Reset counts
    this.totalCases = this.AssignedData.length;
    this.assignedCases = 0;
    this.unassignedCases = 0;

    // Count assigned and unassigned cases
    this.AssignedData.forEach(item => {
      if (item.assigned === 'Y') {
        this.assignedCases++;
      } else {
        this.unassignedCases++;
      }
    });
  }



  
 getUnAssigned(): void {
    this.sharedService.getUnAssigned().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.UnAssignedData = result;
        // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary

      }
    );
  }

    get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.AssignedData.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.AssignedData;
    }
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

    // doc.autoTableSetDefaults({
    //   headStyles: { fillColor: [100, 100, 255] },
    //   bodyStyles: { textColor: 0 },
    //   alternateRowStyles: { fillColor: [245, 245, 245] },
    // });

    // doc.autoTable({
    //   head: [headers],
    //   body: tableData,
    // });
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


  

  
   applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    if (filterValue.trim() === '') {
      // If the input value is empty, show the original data
      this.UnAssignedData = this.UnAssignedData;
    } else {
      // Otherwise, filter the original data based on the input value
       this.UnAssignedData =  this.UnAssignedData.filter(item => item.id.toString().includes(filterValue));
    }
  }
    pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getUnAssigned();
    
  }
   onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
   this.getAssigned();
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


