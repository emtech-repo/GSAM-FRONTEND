

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser: any;
  userRoles: string[] = [];
  allowedRoles: string[] = ['Admin', 'Manager', 'Officer'];
  unverifiedUserCount: number = 0;
  dataSource: any[] = [];
message: any;

  constructor(
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUnverifiedCount();
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      try {
        this.currentUser = JSON.parse(currentUserString);
        // console.log('Current user:', this.currentUser);
        // console.log('roles',this.userRoles)
        this.userRoles = this.currentUser.role; // Update to access 'role' instead of 'roles'
      } catch (error) {
        console.error('Error parsing currentUser from local storage:', error);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.sharedService.isAuthenticated = false;
    this.router.navigate(['/Authenticate']);
  }

  navigateToRetrieve(): void {
    this.router.navigate(['/documents/retrieve']);
  }


  getUnverifiedCount(): void {
    this.sharedService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.dataSource = res.result;
        const unverifiedUsers = this.dataSource.filter((user: any) => user.activeFlag === 'N');
        this.unverifiedUserCount = unverifiedUsers.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userHasAccess(allowedRoles: string[]): boolean {
    // Ensure this.userRoles is defined
    if (!this.userRoles) {
      return false;
    }
    return allowedRoles.some(role => this.userRoles.includes(role));
  }


}

