import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-case',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  @ViewChild('searchDialog') searchDialog!: ElementRef;

  pageSize: number = 3;
  currentPage: number = 1;
  totalItems: number = 0;
  searchBy: string = '';
  filteredData: any[] = [];
  searchClicked: boolean = false;
  activeTab: string = '';
  documents: any[] = [];
  filteredDocuments: any[] = [];
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  searchForm = new FormGroup({
    accNumber: new FormControl(''),
    accName: new FormControl(''),
    cifID: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(private router: Router, private sharedService: SharedService, @Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal) { }

  ngOnInit() {
    this.getDocument();
  }

  openModal(content: TemplateRef<Element>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getDocument(): void {
    this.sharedService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.filteredDocuments = documents;
    });
  }

  applySearchFilter(): void {
    let filteredData = this.documents;
    if (this.searchTerm && this.searchBy && this.searchClicked) {
      filteredData = filteredData.filter(item =>
        item[this.searchBy].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredData = filteredData;
    this.totalItems = this.filteredData.length;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.applySearchFilter();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchClicked = true;
    this.applySearchFilter();
  }

  setSearchBy(column: string): void {
    this.searchBy = column;
    this.applySearchFilter();
  }

  performSearch() {
    this.searchTerm = this.searchForm.get('accName')?.value || '';
    this.searchTerm = this.searchForm.get('accNumber')?.value || '';
    this.startDate = this.searchForm.get('startDate')?.value || '';
    this.endDate = this.searchForm.get('endDate')?.value || '';
    this.filterDocuments(); // Apply filters based on form inputs
  }

  onSubmit(event?: Event) {
    event?.preventDefault();
    this.searchTerm = this.searchForm.get('accName')?.value || '';
    this.searchTerm = this.searchForm.get('accNumber')?.value || '';
    this.startDate = this.searchForm.get('startDate')?.value || '';
    this.endDate = this.searchForm.get('endDate')?.value || '';
    console.log(this.searchForm.value);
    console.log(`Submit button clicked. Search Term: ${this.searchTerm}, Start Date: ${this.startDate}, End Date: ${this.endDate}`);
    this.performSearch();
    
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  customerFound: boolean = false;

  filterDocuments() {
    if (isPlatformBrowser(this.platformId)) {
      this.filteredDocuments = [...this.documents];
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      if (this.searchTerm.trim() !== '') {
        this.filteredDocuments = this.filteredDocuments.filter(document => {
          return document.accNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            document.accName.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      }
      if (this.startDate.trim() !== '' && this.endDate.trim() !== '') {
        this.filteredDocuments = this.filteredDocuments.filter(document => {
          const documentDate = new Date(document.nextpaymentdate.replace(/\/\d{2}\/\d{4}/, ''));
          return documentDate >= startDate && documentDate <= endDate;
        });
      }
    }
    this.customerFound = this.filteredDocuments.length > 0;
  }
}