import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  apiUrl: string = '';
  data: any[] = [];
  totalCases: number = 0;
  assignedCases: number = 0;
  openCases: number = 0;
  closedCases: number = 0;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

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
    this.openCases = this.data.filter(item => item.assigned === "N").length;
    this.closedCases = this.data.filter(item => item.assigned === "Y").length;
  }
}
