import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent  {
   
  showRefinanceDetailsFlag: boolean = false;
  showRestructureDetailsFlag: boolean = false;
  showRecoveryDetailsFlag: boolean = false;
 
  currentPage: number = 1;
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];
  Assigneddata: any[] = []; 
  AssignedUrl: string = '';
   loanAccount: string | null = null;
  decisionDetails: any;
 
    

  

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService,
 public bsModalRef: BsModalRef, private http: HttpClient,private route: ActivatedRoute) { }

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loanAccount = params['loanAccount'];
      console.log('Received loan account:', this.loanAccount); // Log the received loan account
      if (this.loanAccount) {
        this.fetchDecisionDetails();
      }
    });
    this.AssignedUrl= this.sharedService.AssignedUrl;
  this.getAssigned();
  }


  fetchDecisionDetails(): void {
    this.sharedService.getDecisionDetails(this.loanAccount!).subscribe(
      (response: any) => {
        if (response && response.result && Array.isArray(response.result)) {
          const result = response.result;
          // Find the case details object with matching loanAccount
          const decisionDetail = result.find((caseItem: any) => caseItem.loanAccount === this.loanAccount);
          if (decisionDetail) {
            this.decisionDetails = decisionDetail;
            console.log('Decision details:', this.decisionDetails); // Console log the fetched case details
          } else {
            console.error('Decision details not found for loan account:', this.loanAccount);
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Failed to fetch desision details:', error);
      }
    );
  }


 
  
  getAssigned(): void {
    this.http.get<any>(this.AssignedUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.Assigneddata = response.result;
       

      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }
 

  
   applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    if (filterValue.trim() === '') {
      // If the input value is empty, show the original data
      this.dataSourceFiltered = this.dataSource;
    } else {
      // Otherwise, filter the original data based on the input value
      this.dataSourceFiltered = this.dataSource.filter(item => item.id.toString().includes(filterValue));
    }
  }



  goToHome() {
    // Navigate to the "home" route
    this.router.navigate(['/home']);
  }







   showRefinanceDetails(loanAccount: any) {
         console.log('Navigating to refinance details with loan account:', loanAccount);

        this.showRefinanceDetailsFlag = !this.showRefinanceDetailsFlag;
         this.showRestructureDetailsFlag = false;
       this.showRecoveryDetailsFlag = false;

    }

     showRestructureDetails(loanAccount: any) {
       console.log('Navigating to restructure details with loan account:', loanAccount);

        this.showRestructureDetailsFlag = !this.showRestructureDetailsFlag;
         this.showRefinanceDetailsFlag = false;
       this.showRecoveryDetailsFlag = false;
    } 

     showRecoveryDetails(loanAccount: any) {
      console.log('Navigating to case recovery details with loan account:', loanAccount);
      this.showRecoveryDetailsFlag = !this.showRecoveryDetailsFlag;
      this.showRefinanceDetailsFlag = false;
      this.showRestructureDetailsFlag = false;
    } 

    exitPage() {
    this.showRefinanceDetailsFlag = false; // Set the flag to false to hide the assigned cases page
}

    exit() {
    this.showRestructureDetailsFlag = false; // Set the flag to false to hide the assigned cases page
}

    exits() {
    this.showRecoveryDetailsFlag = false; // Set the flag to false to hide the assigned cases page
}





}