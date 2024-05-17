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
  searchParams = { param: '', value: '' }
  currentPage: number = 1;
  searchOption: string = 'AccNumber';





  @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;


  selectTab(index: number) {
    this.selectedIndex = index;
  }
  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.getCustomers();

  }

   setSearchOption(option: string) {
    this.searchOption = option;
  }

  search(): void {
    console.log('Search method called'); // Debugging line
    this.currentPage = 1; // Reset current page for search
    this.Customers = this.Customers.filter(item => {
      switch (this.searchParams.param) {
        case 'loanAccount':
          return item.AccNumber.toLowerCase().includes(this.searchParams.value.toLowerCase());
        case 'CifID':
          return item.CifID.toLowerCase().includes(this.searchParams.value.toLowerCase());
        case 'CaseNumber':
          return item.CaseNumber.toLowerCase().includes(this.searchParams.value.toLowerCase());
       
        default:
          return false;
      }
    });
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