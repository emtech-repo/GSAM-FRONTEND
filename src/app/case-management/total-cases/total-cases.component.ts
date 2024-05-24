import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-total-cases',
  templateUrl: './total-cases.component.html',
  styleUrl: './total-cases.component.css'
})
export class TotalCasesComponent implements OnInit {

  showUnAssignedCasesFlag: boolean = false;
  showAssignedCasesFlag: boolean = false;
  showTotalCasesFlag: boolean = true;
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

  data: any[] = []; // Your data array
  // AssignedData: any[] = []; // Your data array
  // UnAssignedData: any[] = []; // Your data array

  cd: any;
  apiUrl: string = '';
  CasesUrl: string = '';
  


  constructor(private sharedService: SharedService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cardType = this.route.snapshot.queryParamMap.get('cardType');
    if (cardType === 'total-cases') {
      // Load total cases data
    }
  


    this.apiUrl=this.sharedService.CasesUrl;
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
        // this.calculateCaseCounts();

      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
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

  
  // calculateCaseCounts(): void {
  //   this.totalCases = this.data.length;
  //   this.assignedCases = this.data.filter(item => item.assigned === "Y").length;
  //   this.unassignedCases = this.data.filter(item => item.assigned === "N").length;
  // }
  

  exit() {
    this.showUnAssignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }
  ex() {
    this.showTotalCasesFlag = false; // Set the flag to false to hide the Total cases page
  }
  exitPage() {
    this.showAssignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }
}
