import { Component, Input,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;
  submittedSuccessfully: any;
  comments: string = '';
  action: string = ''; // Declare the action property

  apiUrl: string = '';
  data: any[] = [];
  selectedItem: any = null;
  page: number = 1; 
  showModal: boolean = false; // Property to control modal visibility
  comment: string = ''; // Property to store comment input



  constructor(private sharedService: SharedService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.apiUrl = this.sharedService.SubmissionsUrl;
    this.fetchData();

  }

  // Define the goToRequests method
  goToRequests(requestId: string): void {
    this.router.navigate(['approval/app-requests'])
  }

  openModal(item: any) {
    this.selectedItem = item;
    this.comment = ''; // Clear comment input when modal is opened
    this.showModal = true; // Set showModal property to true to show the modal

  }

  closeModal() {
    this.selectedItem = null;
    this.comment = ''; // Clear comment input when modal is opened
    this.showModal = false; // Set showModal property to false to hide the modal

  }

  approveService() {
    // Add logic to approve the request
    console.log("Request Approved");
    // You can perform further actions here, such as updating the status in the database
    this.closeModal(); // Close the modal after approving the request

  }

  rejectService() {
    // Add logic to reject the request
    console.log("Request Rejected");
    // You can perform further actions here, such as updating the status in the database
    this.closeModal(); // Close the modal after rejecting the request

  }


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

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  approveDocument() {
    console.log('Document approved');
    // Your logic for document approval goes here
  }

  rejectDocument() {
    console.log('Document rejected');
    // Your logic for document rejection goes here
  }

  // CLAIMS
  approveClaim() {
    console.log('Claim approved');
    console.log('Comments:', this.comments); // Access comments entered by admin

    // Your logic to handle claim approval goes here

    // Set submittedSuccessfully to true and action to 'approve'
    this.submittedSuccessfully = true;
    this.action = 'approved';

    // Reset comments field
    this.comments = '';
  }

  rejectClaim() {
    console.log('Claim rejected');
    console.log('Comments:', this.comments); // Access comments entered by admin

    // Your logic to handle claim rejection goes here

    // Set submittedSuccessfully to true and action to 'reject'
    this.submittedSuccessfully = true;
    this.action = 'rejected';

    // Reset comments field
    this.comments = '';
  }
}
