import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-search-cases',
  templateUrl: './search-cases.component.html',
  styleUrls: ['./search-cases.component.css']
})
export class SearchCasesComponent implements OnInit {
  loanAccount: any;
  loanItem: any;
  pagedCasesdata: any[] = [];
  searchOption: string = 'assignedTo';
  searchQuery: string = '';
  searchTerm: string = '';
  loanDetails: any;
  loandata: any;
  recentActivityData: any[] = [];
  SearchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  selectedItem: any;
  data: any[] = [];
  cd: any;
  Casesdata: any[] = [];
  apiUrl: string = '';
  activeTab: string = 'general';
  showTabs: boolean = false;
  searchParams: any = { param: 'acid', value: '' };
  totalPages: number | undefined;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.apiUrl = this.sharedService.ActivityUrl;
    this.fetchData();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchData();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterData();
  }

  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      response => {
        if (response && response.result && Array.isArray(response.result)) {
          this.data = response.result;
          this.totalItems = this.data.length;
          this.filterData();
        } else {
          console.error('Invalid data received from API:', response);
        }
      },
      error => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.pagedCasesdata = [...this.data];
    } else {
      // Filter data based on selected parameter and value
      this.pagedCasesdata = this.data.filter(item => {
        return item[this.searchParams.param] === this.searchParams.value;
      });
    }
    this.totalItems = this.pagedCasesdata.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCasesdata = this.pagedCasesdata.slice(startIndex, endIndex);
  }

  getLoanDetails(acccountId: string): void {
    this.sharedService.getLoanDetails(acccountId).subscribe(
      (response: any) => {
        console.log('Loan Details:', response.entity);
        this.loanDetails = response.entity;
        this.showTabs = true;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching loan details:', error);
      }
    );
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  exitPage(): void {
    this.showTabs = false; // Set the flag to false to hide the assigned cases page
  }

  goToDocuments(): void {
    // Navigate to the "home" route
    this.router.navigate(['/documents']);
  }

  activateTabAndNavigate(tabName: string): void {
    this.activeTab = tabName; // Update the active tab state
    if (tabName === 'documents') {
      this.router.navigate(['/documents/app-retrieve']); // Navigate to the documents page
    }
  }

  downloadExcel(): void {
    const tableData = this.getTableData();
    // Implement logic to convert tableData to Excel format
    // For example, you can use a library like ExcelJS
    // const excelData = convertToExcelFormat(tableData);
    // const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // FileSaver.saveAs(blob, 'schedule.xlsx');
  }
}
