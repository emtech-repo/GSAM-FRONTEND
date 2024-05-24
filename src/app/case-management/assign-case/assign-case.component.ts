import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrl: './assign-case.component.css'
})
export class AssignCaseComponent {
  showUnassignedCasesFlag: boolean = false;
  showAssignedCasesFlag: boolean = false;
  showAllCasesFlag: boolean = true;
  recentActivityData: any[] = [];
  modalService: any;
  row: any;
  constructor(private router: Router, private sharedService: SharedService, private toastr: ToastrService,
    public bsModalRef: BsModalRef, private http: HttpClient) { }


  // goToCaseDetails(selectedRow: any): void {
  //   // Log the selected row data
  //   console.log('Selected row:', selectedRow);

  //   // Navigate to the "case-details" route and pass the selected row data as a parameter
  //   this.router.navigate(['/case-details', selectedRow]);
  // }


  // goToCaseDetails(loanAccount: string) {
  //   // Call the API to fetch details using the specific 'loanAccount' as parameter
  //   this.sharedService.getUnAssigned(loanAccount).subscribe(
  //     (details: any) => {
  //       // Once details are fetched successfully, navigate to the "case-details" route
  //       console.log('Selected: LOAN ACCOUNT', loanAccount);

  //       this.router.navigate(['/case-details'], { state: { loanAccount, details } });
  //     },
  //     (error: any) => {
  //       // Handle error if details fetching fails
  //       console.error('Failed to fetch CASES:', error);
  //       // Navigate to the "case-details" route without details
  //       this.router.navigate(['/case-details'], { state: { loanAccount } });
  //     }
  //   );
  // }
  goToCaseDetails(loanAccount: any): void {
    console.log('Navigating to case details with loan account:', loanAccount);
    this.router.navigate(['/case-details', loanAccount]);
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


  data: any[] = []; // Your data array
  UnAssigneddata: any[] = [];
  Assigneddata: any[] = [];
  cd: any;
  apiUrl: string = '';
  AssignedUrl: string = '';
  UnAssignedUrl: string = '';


  ngOnInit(): void {


    this.apiUrl = this.sharedService.ActivityUrl;
    this.UnAssignedUrl = this.sharedService.UnAssignedUrl;
    this.AssignedUrl = this.sharedService.AssignedUrl;

    this.fetchData();
    this.UnAssigned();
    this.getAssigned();


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

  UnAssigned(): void {
    this.http.get<any>(this.UnAssignedUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.UnAssigneddata = response.result;
        this.calculateCaseCounts();

      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  getAssigned(): void {
    this.http.get<any>(this.AssignedUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.Assigneddata = response.result;
        this.calculateCaseCounts();

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

  calculateCaseCounts(): void {
    this.totalCases = this.data.length;
    this.assignedCases = this.data.filter(item => item.assigned === "Y").length;
    this.unassignedCases = this.data.filter(item => item.assigned === "N").length;
  }


  showUnassignedCases() {
    this.showUnassignedCasesFlag = !this.showUnassignedCasesFlag;
    this.showAllCasesFlag = false;
    this.showAssignedCasesFlag = false;

  }
  showAllCases() {
    this.showAllCasesFlag = !this.showAllCasesFlag;
    this.showAssignedCasesFlag = false;
    this.showUnassignedCasesFlag = false;

  }



  showAssignedCases() {
    this.showAssignedCasesFlag = !this.showAssignedCasesFlag;
    this.showAllCasesFlag = false;
    this.showUnassignedCasesFlag = false;

  }

  exit() {
    this.showUnassignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }
  ex() {
    this.showAllCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }
  exitPage() {
    this.showAssignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
  }

}