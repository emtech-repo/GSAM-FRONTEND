import { Component, Input,OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute,Router } from '@angular/router'; // If needed
import { response } from 'express';


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
  
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  actionType: string |null=null;
  

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      
      const documentId = params['id'];
      
    });
  }
  setAction(action: string) {
    this.actionType = action;
  }
  handleSubmit(document:any) {
    this.loading = true;
    if (this.actionType === 'approve') {
      this.approveDocument(document);
    } else if (this.actionType === 'reject') {
      this.rejectDocument(document);
    }
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
    if (!document || !document.comments) {
      return;
    }
    this.sharedService.approveDocument(document.documentUrl, document.comments,document.id)
      .subscribe(
        (response) => {
          // this.loading = false;
          this.successMessage = response.message;
          this.document.verifiedFlag = 'Y';
          this.updateDocumentStatus(this.document.id, 'Y')
          
          // Optionally, you can update the UI or perform any other action after approval
        },
        (error) => {
          // this.errorMessage = response.message;
          
        }
      );
  }

  updateDocumentStatus(id: string, status: string) {
    const document = this.documents.find(doc => doc.id === id);
    if (document) {
      document.verifiedFlag = status;
      document.rejectedFlag = status;
    }
  }
  
  fetchDocuments(): void {
    this.sharedService.getPendingDocuments().subscribe(
      (response) => {
        console.log('Documents fetched successfully:', response);
        this.documents = response.result.filter((document: any) => document.verifiedFlag === 'N' || document.rejectedFlag ==='N');
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }



  rejectDocument(document: any) {
    if (!document || !document.comments) {
      return;
    };
    const documentUrl = document.documentUrl;
    const comments = document.comments;
    const id = document.id;
    this.sharedService.rejectDocument(document.documentUrl, document.comments, document.id).subscribe(
      (response) => {
        this.successMessage = response.message;
        // Setting verifiedFlag to 'N'
        this.document.rejectedFlag = 'Y'; // Setting rejectFlag to 'Y'
        this.updateDocumentStatus(document.id,  'Y'); // Updating document status
        console.log('Document rejected successfully:', response);
        // Optionally, you can update the UI or perform any other action after rejection
      },
      (error) => {
        console.error('Error rejecting document:', error);
      }
    );
    
  
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
