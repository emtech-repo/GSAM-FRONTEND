import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrl: './search-case.component.css'
})
export class SearchCaseComponent {
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

};











