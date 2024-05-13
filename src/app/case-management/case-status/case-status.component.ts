import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { SharedService } from '../../shared.service';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-case-status',
  templateUrl: './case-status.component.html',
  styleUrl: './case-status.component.css'
})
export class CaseStatusComponent {
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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getStatus();

  }
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


  // search() {
  //   if (this.searchOption && this.searchTerm) {
  //     this.statusData = this.statusData.filter(item => {
  //       switch (this.searchOption) {
  //         case 'assignedTo':
  //           return item.assignedEmail.toLowerCase().includes(this.searchTerm.toLowerCase());
  //         case 'cif':
  //           return item.cifId.toLowerCase().includes(this.searchTerm.toLowerCase());
  //         case 'accName':
  //           return item.accountName.toLowerCase().includes(this.searchTerm.toLowerCase());
  //         default:
  //           return false;
  //       }
  //     });
  //   } else {
  //     this.statusData = [
  //       { assignedEmail: 'john@example.com', cifId: '123', loanAccount: '456', accountName: 'Example Account', verifiedFlag: 'Verified' },
  //     ];
  //   }
  // }




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

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getStatus();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.getStatus();
  }

  // Getter for filtered data based on search term
  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.statusData.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.statusData;
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

}
