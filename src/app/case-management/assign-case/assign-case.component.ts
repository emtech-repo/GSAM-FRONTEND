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
  pagedCasesdata: any;

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
  this.UnAssigneddata = this.UnAssigneddata.filter(item => item.loanAccount.toLowerCase().includes(this.searchTerm.toLowerCase()));
}

search(): void {
    console.log('Search method called');
    this.currentPage = 1; // Reset current page for search

    // Determine the search parameter based on the selected option
    let searchParamKey: string;
    switch (this.searchParams.param) {
        case 'loanAccount':
            searchParamKey = 'loanAccount';
            break;
        case 'accountName':
            searchParamKey = 'accountName';
            break;
        case 'caseNumber':
            searchParamKey = 'caseNumber';
            break;
        case 'cifId':
            searchParamKey = 'cifId';
            break;
        default:
            console.error('Invalid search parameter');
            return; // Exit function if an invalid search parameter is selected
    }

    // Filter the data based on the selected search parameter and value
    this.pagedCasesdata = this.data.filter(item => {
        return item[searchParamKey].toLowerCase().includes(this.searchParams.value.toLowerCase());
    });
}



   filterData(): void {
    if (this.searchParams.value.trim() === '') {
      // If search value is empty, show all data
      this.pagedCasesdata = [...this.data];
    } else {
      // Filter data based on selected parameter and value
      this.pagedCasesdata = this.data.filter(item => {
        return item[this.searchParams.param]?.toString().toLowerCase().includes(this.searchParams.value.toLowerCase());
      });
    }
    this.totalItems = this.pagedCasesdata.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCasesdata = this.pagedCasesdata.slice(startIndex, endIndex);
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
        this.showAllCasesFlag = !this.showAllCasesFlag ;
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
    this.showAssignedCasesFlag = false; // Set the flag to false to hide the assigned cases page
}

}