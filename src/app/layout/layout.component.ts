import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(
    public sharedService: SharedService, private router: Router
  ) {}

  ngOnInit(): void {
  
  }
  logout(){
    localStorage.removeItem("currentUser");
    this.sharedService.isAuthenticated = false;
      this.router.navigate(['/Authenticate']);

  }
}
