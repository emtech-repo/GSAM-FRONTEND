

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import  FileSaver from 'file-saver';
import  jsPDF from 'jspdf';
interface LoanDetailsResponse {
  entity: any; // Define the structure according to your API response
}



@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrls: ['./search-case.component.css']
})

export class SearchCaseComponent implements OnInit {


  // loanDetails: any;

  // LoanData: any = {};
  LoanData: any[] = [];
  // loanDetails:any[]=[];
  // activeTab: string = '';
  loanItem: any;
  // Adjust the type as necessary
  activeTab: string = 'general';
  
  showTabs: boolean = false; // Property to control the visibility of the tabs

  // Assuming LoanData is the JSON object returned by the API
  pagedLoanData: any = {}; // Array to hold the currently displayed page data
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  searchParams: any = { param: 'acid', value: '' };
  
  private destroy$ = new Subject<void>();
  loanDetails: any = { entity: {} }; // Initialize with an empty object
  @ViewChild('content') content!: ElementRef; 


  constructor(private router: Router, private sharedService: SharedService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // Assign a value to accountId
    this.getLoan();
    // this.getLoanDetails();
  }
  // 
  downloadExcel(): void {
    const tableData = this.getTableData();
    // Implement logic to convert tableData to Excel format
    // For example, you can use a library like ExcelJS
    // const excelData = convertToExcelFormat(tableData);
    // const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // FileSaver.saveAs(blob, 'schedule.xlsx');
  }

  downloadPDF(): void {
    const tableData = this.getTableData();
    const pdfContent = this.generatePDFContent(tableData);
    const pdf = new jsPDF();
    pdf.text(pdfContent, 10, 10);
    pdf.save('schedule.pdf');
  }

  getTableData(): any[] {
    const tableRows = Array.from(document.querySelectorAll('table tbody tr'));
    const data: any[] = [];
    tableRows.forEach(row => {
      const rowData: { [key: string]: string } = {}; // Explicitly typing rowData object
      const cells = Array.from(row.querySelectorAll('td'));
      cells.forEach((cell, index) => {
        rowData[`column${index + 1}`] = cell?.textContent?.trim() || ''; // Optional chaining and nullish coalescing
      });
      data.push(rowData);
    });
    return data;
  }  

  generatePDFContent(tableData: any[]): string {
    const doc = new jsPDF();
    const imgData = '../assets/images/equity-bank.png'; // Path to your image

    // Add image
    const fontSize = 8;
    doc.setFontSize(fontSize);
    doc.addImage(imgData, 'PNG', 10, 10, 20, 0); // Adjust the x, y, width, height as necessary

    // Add text content
    doc.setFontSize(12);
    doc.text('Loan Repayment Schedule:', 10, 40);
    doc.text(`Account Name: ${this.loanDetails.accountName}`, 10, 50);
    doc.text(`Account Number: ${this.loanDetails.acid}`, 10, 60);
    doc.text(`Date: ${this.getCurrentDate()}`, 10, 70);

    // Add table headers
    let startY = 80;
    doc.setFont('bold');
    doc.text('ID', 10, startY);
    doc.text('Start Date', 30, startY);
    doc.text('Installment Number', 60, startY);
    doc.text('Description', 100, startY);
    doc.text('Amount', 150, startY);

    // Draw table header border
    doc.rect(8, startY - 5, 182, 10); // Full row border

    // Add table data
    startY += 10;
    this.loanDetails.loan.loanSchedules.forEach((schedule: { id: string; startDate: string; installmentNumber: number; installmentDescription: string; installmentAmount: number }) => {
      doc.text(`${schedule.id}`, 10, startY);
      doc.text(`${schedule.startDate}`, 30, startY);
      doc.text(`${schedule.installmentNumber}`, 60, startY);
      doc.text(`${schedule.installmentDescription}`, 100, startY);
      doc.text(`${schedule.installmentAmount}`, 150, startY);

      // Draw borders for each row
      doc.rect(8, startY - 4, 182, 10); // Full row border
      doc.line(28, startY - 4, 28, startY + 6); // Column separator
      doc.line(58, startY - 4, 58, startY + 6); // Column separator
      doc.line(98, startY - 4, 98, startY + 6); // Column separator
      doc.line(148, startY - 4, 148, startY + 6); // Column separator

      startY += 10;
    });

    // Draw table bottom border
    doc.line(8, startY - 4, 190, startY - 4);
    doc.save('LoanRepaymentSchedule.pdf');
    return doc.output('datauristring'); // Returns the PDF as a data URI
  }



 
  getCurrentDate(): string {
    const currentDate: Date = new Date();
    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Months are zero based
    const year: number = currentDate.getFullYear();

    // Pad day and month with leading zeros if needed
    const formattedDay: string = (day < 10) ? '0' + day : day.toString();
    const formattedMonth: string = (month < 10) ? '0' + month : month.toString();

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    
  }
  // In your Angular component
 
  // TypeScript


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updatePagedLoanData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedLoanData = this.LoanData.slice(startIndex, endIndex);
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.updatePagedLoanData();
  }

  getLoan(): void {
    this.sharedService.getLoan().pipe(takeUntil(this.destroy$)).subscribe(

      (response: any) => {
        // console.log('Loan Data:', response.entity);
        this.LoanData = response.entity; // Assuming 'entity' is an array of loan objects
        this.totalItems = this.LoanData.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.filterData();
        this.updatePagedLoanData();
        this.setActiveTab('general');
        this.cdRef.detectChanges(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching loans:', error);
      }
    );
  }
  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.LoanData = [...this.LoanData];
    } else {
      // Filter data based on selected parameter and value
      this.LoanData = this.LoanData.filter(item => {
        return item[this.searchParams.param] === this.searchParams.value;
      });
    }
    this.totalItems = this.LoanData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  search(): void {
    console.log('Search method called'); // Add this line for debugging
    this.currentPage = 1;
    this.getLoan();
    
  }
  getLoanDetails(acccountId: string): void {
    this.sharedService.getLoanDetails(acccountId).subscribe(
      (response: any) => {
        console.log('Loan Details:', response.entity);
        this.loanDetails = response.entity;
        // Handle loan details here
        // const url = '/search-case/' + acccountId; // Adjust the URL as needed
        // window.open(url, '_blank');
        this.showTabs = true;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching loan details:', error);
      }
    );
  }
  goToDouments() {
    // Navigate to the "home" route
    this.router.navigate(['/doucuments']);
  }
}