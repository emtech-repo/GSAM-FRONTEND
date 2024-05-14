import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrl: './assign-case.component.css'
})
export class AssignCaseComponent {
    recentActivityData: any[] = [];

  constructor(private router: Router,private sharedService: SharedService) { }

  goToCaseDetails() {
    // Navigate to the "case-details" route
    this.router.navigate(['/case-details']);
  }

  
  searchQuery: string = '';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;



  ngOnInit(): void {
    this.fetchRecentActivity();
  }

  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe((response: any) => { // Specify the type of the response
        if (response && response.statusCode === 200) {
          const result = response.result as any[];
          if (Array.isArray(result)) {
            this.recentActivityData = result.slice(startIndex, endIndex);
            this.totalItems = result.length;
          } else {
            console.error('Error: Data result is not an array.');
          }
        } else {
          console.error('Error: Unexpected status code:', response && response.statusCode);
        }
      }, error => {
        console.error('Error fetching recent activity:', error);
      });
  }


  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentActivity();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchRecentActivity();
  }

  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.recentActivityData.filter(item => {
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.recentActivityData;
    }
  }
}
