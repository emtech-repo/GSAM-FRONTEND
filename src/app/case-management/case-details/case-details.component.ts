import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { AssignPopupComponent } from '../assign-popup/assign-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from '../../shared.service';


>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.css'
})
export class CaseDetailsComponent {
<<<<<<< HEAD
=======
   recentActivityData: any[] = [];
     totalItems: number = 0;


 
  

  constructor(private modalService: BsModalService,private sharedService: SharedService) { }
 
   bsModalRef: BsModalRef | undefined;


goToAssignPopup() {
    //  this.router.navigate(['/assign-popup']);
    // Navigate to the "admin page" route
    this.bsModalRef = this.modalService.show(AssignPopupComponent); // Open modal and get modal reference
  }
 
  searchQuery: string = '';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
 


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
>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6

}
