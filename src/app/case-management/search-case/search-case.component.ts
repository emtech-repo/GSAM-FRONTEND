import { Component, OnInit  } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../../shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse{
  data:any[];
  source:any[];
}

@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrl: './search-case.component.css'


})
export class SearchCaseComponent implements OnInit {
 

 SearchCaseFormUrl: ApiResponse = { data: [], source: [] };
  


  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Instalments',
    },
    chart: {
      type: 'column', // Specify the type of chart
      width: 800, // Set the width of the chart
      height: 500 // Set the height of the chart
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] // Sample x-axis categories
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
    this.sharedService.getUserInfo().subscribe(
      (data: ApiResponse) => {
        console.log('Data received from API:', data);
        this.SearchCaseFormUrl = data;
        console.log('Assigned JSON Data:', this.SearchCaseFormUrl);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching JSON data:', error);
      }
    
    );
  }
  goToCreateMeeting() {
    // Navigate to the "Create Meeting" route
    this.router.navigate(['/create-meeting']);
  }
  goToCaseDecision() {
    // Navigate to the "Create Meeting" route
    this.router.navigate(['/case-decision']);
  }
};











