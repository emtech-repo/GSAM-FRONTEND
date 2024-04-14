import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent  implements OnInit{
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
      colors: ['#4e73df', '#1cc88a', '#5a5c69']
    }]
  };


  searchQuery: string = '';
  searchTerm: string = '';
  
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  recentActivityData: any[] = []; // Your data array
  
 
  // pageChanged(event: any): void {
  //   this.currentPage = event.page;
  //   this.fetchRecentActivity();
  // }

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchRecentActivity();
  }


  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Call the API to get recent activity data
    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.recentActivityData = data.slice(startIndex, endIndex);
          this.totalItems = data.length;
        } else {
          console.error('Error: Data is not an array.');
        }
      }, error => {
        console.error('Error fetching recent activity:', error);
      });
  }

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecentActivity();
  }

  // Method to handle search query change
  onSearch(): void {
    this.currentPage = 1; // Reset current page when performing a new search
    this.fetchRecentActivity();
  }

  


  get filteredData() {
    if (this.searchTerm !== undefined && this.searchTerm !== null) {
      return this.recentActivityData.filter(item => {
        // Convert item properties to string and check if any property contains the search term
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
