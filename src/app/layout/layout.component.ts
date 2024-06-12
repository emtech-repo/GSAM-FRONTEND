import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {


  currentUser: any;
  isAdmin: boolean = false;
  isManager: boolean = false;
  isOfficer: boolean = false;
  unverifiedUserCount: number = 0;
  dataSource: any[] = [];

  constructor(
    public sharedService: SharedService, private router: Router
  ) {}

  ngOnInit(): void {
    this.getUnverifiedcount();
   // notifications



    // Retrieve user information from local storage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      try {
        this.currentUser = JSON.parse(currentUserString);
        console.log('Current user:', this.currentUser); // Debugging statement
        // console.log('Logged in user:', this.currentUser.email, this.currentUser.role); // Print email and roles

      } catch (error) {
        console.error('Error parsing currentUser from local storage:', error);
      }
    }
    this.isAdmin = this.sharedService.isAdmin();
    this.isManager = this.sharedService.isManager();
    this.isOfficer = this.sharedService.isOfficer();
  }


  
  logout(){
    localStorage.removeItem("currentUser");
    this.sharedService.isAuthenticated = false;
      this.router.navigate(['/Authenticate']);

  }
  navigateToRetrieve() {
    this.router.navigate(['/documents/retrieve']); // Navigate to the RetrieveComponent in the Documents module
  }

  getUnverifiedcount() {
    this.sharedService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.dataSource = res.result; // Assign res.result to dataSource

        // Filter unverified users and get the count
        const unverifiedUsers = this.dataSource.filter((user: any) => user.activeFlag === 'N');
        this.unverifiedUserCount = unverifiedUsers.length; // Store the count
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
