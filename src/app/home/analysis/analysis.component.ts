import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent  implements OnInit{

  recentActivityData: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;


  

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Analysis Chart'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June', 'July', 'August', 'Sept', 'Oct','Nov', 'Dec'] // Customize X-axis categories
    },
    yAxis: {
      title: {
        text: 'Amount (USD)' // Customize Y-axis title
      }
    },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
    },
    series: [
      {
        type: 'line',
        name: 'Actual',
        data: [0, 20, 30, 25, 60,40, 90, 70, 65, 50,70.80]
      },
      {
        type: 'line',
        name: 'Target',
        data: [10, 15, 25, 20, 35,20, 30, 25, 40,40,60,100]
      }
    ]
  };

  pieChartOptions: Highcharts.Options = {
    title: {
      text: 'Pie Chart'
    },
    credits: {
      enabled: false
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
        ['Active Case', 2],
        ['Assigned', 30],
        ['Closed', 45]
        
      ],
      colors: ['maroon', 'blue', '#00cfd5']
    }]
  };

  searchQuery: string = '';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchRecentActivity();
  }

  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe((response: any) => { // Specify the type of the response
        if (response && response.statusCode === 200) {
          const result = response.result as any[];
          if (Array.isArray(result)) {
            this.recentActivityData = result.slice(startIndex, endIndex);
            this.totalItems = result.length;
          } else {
            console.error('Error: Data result is not an array.');
          }
        } else {
          console.error('Error: Unexpected status code:', response && response.statusCode);
        }
      }, error => {
        console.error('Error fetching recent activity:', error);
      });
  }


  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentActivity();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchRecentActivity();
  }

  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.recentActivityData.filter(item => {
        for (let key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().includes(this.searchTerm.toString())) {
            return true;
          }
        }
        return false;
      });
    } else {
      return this.recentActivityData;
    }
  }
}

