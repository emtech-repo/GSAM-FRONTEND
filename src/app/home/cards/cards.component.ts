import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  showUnAssignedCasesFlag: boolean = false;
  showOpenCasesFlag: boolean = false;
  showTotalCasesFlag: boolean = true;


  total: string = '';
  apiUrl: string = '';
  data: any[] = [];
  totalCases: number = 0;
  assignedCases: number = 0;
  activeCases: number = 0;
  closedCases: number = 0;
  selectedCaseType: string | null = null;
 

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.apiUrl = this.sharedService.ActivityUrl;
    this.fetchData();
  }

  fetchData(): void {
    
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.data = response.result;
        this.calculateCaseCounts();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  calculateCaseCounts(): void {
    this.totalCases = this.data.length;
    this.assignedCases = this.data.filter(item => item.assigned === "Y").length;
    this.activeCases = this.data.filter(item => item.assigned === "N").length;
    this.closedCases = this.data.filter(item => item.closed === "Y").length;
  }

  showTotalCases() {
    this.showTotalCasesFlag = !this.showUnAssignedCasesFlag;
    this.router.navigate(['case-management/app-total-cases'])
  }

  showActiveCases() {
    this.router.navigate(['case-management/app-active-cases'])
  }


  showClosedCases() {
    this.router.navigate(['case-management/app-closed-cases'])
  }

  

}
