import { Component, Input,OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute,Router } from '@angular/router'; // If needed


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
[x: string]: any;
  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;
  submittedSuccessfully: any;
  comments: string = '';
  action: string = ''; // Declare the action property
  document: any;
  documents: any[] = []; 
  approvalComments!: string;

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      
      const documentId = params['id'];
      
    });
  }
  goBack() {
    this.router.navigate(['/retrieve']); // Assuming 'retrieve' is the route path for your retrieve component
  }

  selectTab(index: number) {
    this.selectedIndex = index;
  }
  viewSubmission(document: any) {
    // Implement logic to view the submission details
  }
  viewDocument(document: any) {
    // Implement logic to view the submission details
  }
  approveDocument(document: any) {
    if (!document || !this.approvalComments) {
      // Handle the case where either document or approvalComments is missing
      console.error('Document or approval comments missing');
      return;
    }

    this.sharedService.approveDocument(document.documentUrl, this.approvalComments)
      .subscribe(
        (response) => {
          console.log('Document approved successfully:', response);
          // Optionally, you can update the UI or perform any other action after approval
        },
        (error) => {
          console.error('Error approving document:', error);
        }
      );
  }

  // fetchPendingDocuments(): void {
  //   this.sharedService.getPendingDocuments().subscribe(
  //     (response) => {
  //       this.documents = response.result.filter((document: any) => document.verifiedFlag === 'N');
  //     },
  //     (error) => {
  //       console.error('Error fetching pending documents:', error);
  //     }
  //   );
  // }
  fetchDocuments(): void {
    this.sharedService.getPendingDocuments().subscribe(
      (response) => {
        console.log('Documents fetched successfully:', response);
        this.documents = response.result.filter((document: any) => document.verifiedFlag === 'N');
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }



  rejectDocument(document: any) {
    // Implement logic to reject the document
    console.log('Document rejected:', document);
    console.log('Rejection comments:', this.approvalComments);
    // Call your service method to reject the document and handle the response accordingly
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
