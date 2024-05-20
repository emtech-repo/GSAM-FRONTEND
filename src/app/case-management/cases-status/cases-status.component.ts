import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../shared.service';
import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-cases-status',
  templateUrl: './cases-status.component.html',
  styleUrl: './cases-status.component.css'
})
export class CasesStatusComponent {
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
  // casesData: any[] = [];
  cd: any;
  apiUrl: string = '';
  data: any[] = [];

  constructor(private sharedService: SharedService, private http: HttpClient,) { }

  ngOnInit(): void {
    this.apiUrl = this.sharedService.ActivityUrl;
    this.fetchData();

  }
  setSearchOption(option: string) {
    this.searchOption = option;
  }
  search(): void {
    console.log('Search method called'); // Debugging line
    this.currentPage = 1; // Reset current page for search
    this.data = this.data.filter(item => {
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


  // getCases(): void {
  //   this.sharedService.getCases().subscribe(
  //     (result: any[]) => {
       
  //       this.casesData = result;
  //       this.calculateCaseCounts(); 

  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error fetching Status:', error);
        
  //     }
  //   );
  // }
  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.data = response.result;
        this.calculateCaseCounts();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }
  calculateCaseCounts(): void {
    this.totalCases = this.data.length;
    this.activeCases = this.data.filter(item => item.assigned === "N").length;
    this.closedCases = this.data.filter(item => item.assigned === "Y").length;
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchData();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.fetchData();
  }

  // Getter for filtered data based on search term
  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.data.filter(item => {
        // Convert item properties to string and check if any property contains the search term
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.data;
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


