import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { BsModalRef, } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent {
    showRefinanceDetailsFlag: boolean = true;
    showRestructureDetailsFlag: boolean = true;
   showRecoveryDetailsFlag: boolean = true;
 
  currentPage: number = 1;
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];
  AssignedsData: any[] = []; // Your data array

  

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService,
    public bsModalRef: BsModalRef) { }

 

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
  ngOnInit(): void {
    this.getAssigned();
    
  }


  
  getAssigned(): void {
    this.sharedService.getAssigned().subscribe(
      (result: any[]) => {
        // Assign the 'result' array to your component property
        this.AssignedData = result;
        // Calculate case counts after receiving data

      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Status:', error);
        // Handle errors here, if necessary

      }
    );
  }



  goToHome() {
    // Navigate to the "home" route
    this.router.navigate(['/home']);
  }


   showRefinanceDetails() {
        this.showRefinanceDetailsFlag = !this.showRefinanceDetailsFlag;
    } 
     showRestructureDetails() {
        this.showRestructureDetailsFlag = !this.showRestructureDetailsFlag;
    } 
     showRecoveryDetails() {
        this.showRecoveryDetailsFlag = !this.showRecoveryDetailsFlag;
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