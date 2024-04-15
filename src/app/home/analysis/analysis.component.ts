import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent {
  Highcharts: typeof Highcharts = Highcharts;
  

  chartOptions: Highcharts.Options = {
    title:{
      text:'Perfomance Trend',

    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] // Sample x-axis categories
    },
    
    yAxis: {
      title: {
        text: 'Amount(Usd)'
      }
  },
  credits:{
    enabled:false
  },
    series: [
      {
        type: 'line',
        name: 'Target',
        data: [10, 20, 30, 25, 40,50,60,70,80,90,100,110]
      },
      {
        type: 'line',
        name: 'Actual',
        data: [5, 15, 25, 20, 35,30,44,33,40,33,11,30]
      },
      
    ]
  };
  pieChartOptions: Highcharts.Options = {
    title: {
      text: 'Case Trends'
    },
    credits:{
      enabled:false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Distribution',
      data: [
        ['Active', 25],
        ['Active', 25],
        ['Closed', 30],
        ['Assigned', 45]
      ],
      colors:['blue','red','green','maroon']
    }]
  };

 
}

