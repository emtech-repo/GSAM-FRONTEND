import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  isAdmin: boolean = false;
  isManager: boolean = false;
  isOfficer: boolean = false;

  constructor(
    public sharedService: SharedService, private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.sharedService.isAdmin();
    this.isManager = this.sharedService.isManager();
    this.isOfficer = this.sharedService.isOfficer();
  }

  
  logout(){
    localStorage.removeItem("currentUser");
    this.sharedService.isAuthenticated = false;
      this.router.navigate(['/Authenticate']);

  }


  

}
