import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RecoveryFormComponent } from '../recovery-form/recovery-form.component';
import { RefinanceFormComponent } from '../refinance-form/refinance-form.component';
import { RestructureFormComponent } from '../restructure-form/restructure-form.component';



@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent  {
   
  
 
  currentPage: number = 1;
  dataSource: any[] = [];
  dataSourceFiltered: any[] = [];
  Assigneddata: any[] = []; 
  AssignedUrl: string = '';
   @Input() loanAccount:any = '';
  
  
 
    

  

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;



  selectTab(index: number) {
    
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService,
 public bsModalRef: BsModalRef, private http: HttpClient,private route: ActivatedRoute,private modalService: BsModalService,) { }

 ngOnInit(): void {
  // Fetch assigned data
  this.AssignedUrl = this.sharedService.AssignedUrl;
  this.getAssigned();

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
  
  goToRecoveryForm(loanAccount: any): void {
     console.log('Navigating to case details with loan account:', loanAccount);
    this.bsModalRef = this.modalService.show(RecoveryFormComponent, {   
    });
  }
  goToRefinanceForm(loanAccount: any): void {
     console.log('Navigating to case details with loan account:', loanAccount);
    this.bsModalRef = this.modalService.show(RefinanceFormComponent, {   
    });
  }
   goToRestructureForm(loanAccount: any): void {
    console.log('Navigating to case details with loan account:', loanAccount);
    
    this.bsModalRef = this.modalService.show(RestructureFormComponent, { 
     
    });
  }






}