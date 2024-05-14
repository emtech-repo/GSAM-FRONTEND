import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

<<<<<<< HEAD
interface ApiResponse {
  data: any[];
  source: any[];
}
=======
>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6

@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent {
<<<<<<< HEAD
  UserInfoUrl: ApiResponse = { data: [], source: [] };

=======
  Customers: any [] =[];
  CustomersUrl: any;
>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService) { }
<<<<<<< HEAD

  ngOnInit(): void {
    this.sharedService.getUserInfo().subscribe(
      (data: ApiResponse) => {
        console.log('Data received from API:', data);
        this.UserInfoUrl = data;
        console.log('Assigned JSON Data:', this.UserInfoUrl);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching JSON data:', error);
      }

    );
  }
=======
>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6

  ngOnInit() {
    this.getCustomers();
  }
   
  getCustomers(): void {
    this.sharedService.getCustomers()
      .subscribe(Customers => {
        this.Customers = Customers;
       
      });
  }
 goToCaseTracking() {
    // Navigate to the "case tracking" route
    this.router.navigate(['/case-tracking']);
  }
  goToHome() {
    // Navigate to the "home" route
    this.router.navigate(['/home']);
  }

<<<<<<< HEAD
=======
  

 
 

>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6
}