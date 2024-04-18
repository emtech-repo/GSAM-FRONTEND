import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service'; // Adjust the import path as needed


@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrls: ['./search-case.component.css']
})
export class SearchCaseComponent implements OnInit {
  JsonDataUrl: string = '';
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Instalments',
    },
    chart: {
      type: 'column',
      width: 800,
      height: 500
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: "instalments in '000' USD"
      }
    },
    series: [
      {
        type: 'column',
        name: 'Months',
        data: [40, 41, 45, 50, 35, 40, 50, 37, 35, 30, 35, 30],
        pointWidth: 40
      }
    ]
  };

  constructor(private router: Router, private sharedService: SharedService) {}


  ngOnInit(): void {
    this.JsonDataUrl = this.sharedService.getJsonDataUrl();
    console.log('JSON Data:', this.JsonDataUrl);
  }

  goToCreateMeeting() {
    this.router.navigate(['/create-meeting']);
  }

  goToCaseDecision() {
    this.router.navigate(['/case-decision']);
  }

  goToDocumentation() {
    this.router.navigate(['/documentation']);
  }
}
