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
  showTotalCasesFlag = true;
  showActiveCasesFlag = false;
  showClosedCasesFlag = false;
  searchOption: string = 'assignedTo';
  searchQuery: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalCases: number = 0;
  activeCases: number = 0;
  closedCases: number = 0;
  searchParams = { param: '', value: '' }
  casesData: any[] = []; // Your data array
  cd: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getCases();

  }
  setSearchOption(option: string) {
    this.searchOption = option;
  }
  search(): void {
    console.log('Search method called'); // Debugging line
    this.currentPage = 1; // Reset current page for search
    this.casesData = this.casesData.filter(item => {
      switch (this.searchParams.param) {
        // case 'cifId':
        //   return item.cifId.toLowerCase().includes(this.searchParams.value.toLowerCase());
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





  getCases(): void {
    this.sharedService.getCases().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.casesData = result;
        this.calculateCaseCounts(); // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary
      }
    );
  }
  getActive(): void {
    this.sharedService.getActive().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.casesData = result;
        this.calculateCaseCounts(); // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary
      }
    );
  }
  getClosed(): void {
    this.sharedService.getClosed().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.casesData = result;
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
    this.totalCases = this.casesData.length;
    this.activeCases = 0;
    this.closedCases = 0;

    // Count assigned and unassigned cases
    this.casesData.forEach(item => {
      if (item.assigned === 'Y') {
        this.activeCases++;
      } else {
        this.closedCases++;
      }
    });
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCases();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.getCases();
  }

  // Getter for filtered data based on search term
  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.casesData.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.casesData;
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
  showTotalCases() {
    this.showTotalCasesFlag = !this.showTotalCasesFlag;
  }
  showActiveCases() {
    this.showActiveCasesFlag = !this.showActiveCasesFlag;
  }
  showClosedCases() {
    this.showClosedCasesFlag = !this.showClosedCasesFlag;
  }
  exitPage() {
    this.showActiveCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }

  
  exit() {
    this.showTotalCasesFlag = false;
    this.showActiveCasesFlag = false;
    this.showClosedCasesFlag = false;
  }

}