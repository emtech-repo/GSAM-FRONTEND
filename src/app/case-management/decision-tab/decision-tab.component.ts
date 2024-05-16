import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent {
  Customers: any[] = [];
  CustomersUrl: any;

  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService) { }

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






}