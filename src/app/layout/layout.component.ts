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

  constructor(
    public sharedService: SharedService, private router: Router
  ) {}

  ngOnInit(): void {
   

    // Retrieve user information from local storage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      try {
        this.currentUser = JSON.parse(currentUserString);
        console.log('Current user:', this.currentUser); // Debugging statement
        console.log('Logged in user:', this.currentUser.email, this.currentUser.role); // Print email and roles

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

  

}
