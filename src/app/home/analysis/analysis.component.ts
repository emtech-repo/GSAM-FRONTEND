import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  recentActivityData: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  totalCases: number = 0;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Analysis Chart'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Amount (USD)'
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
        data: [0, 20, 30, 25, 60, 40, 90, 70, 65, 50, 70.80]
      },
      {
        type: 'line',
        name: 'Target',
        data: [10, 15, 25, 20, 35, 20, 30, 25, 40, 40, 60, 100]
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
        ['Assigned', 0],
        ['Unassigned', 0]
      ],
      colors: ['#00cfd5', 'blue']
    }]
  };

  total: string = '';
  apiUrl: string = '';
  data: any[] = [];

  assignedCases: number = 0;
  activeCases: number = 0;
  closedCases: number = 0;
  selectedCaseType: string | null = null;

  searchQuery: string = '';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private sharedService: SharedService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchRecentActivity();
    this.apiUrl = this.sharedService.ActivityUrl;
    this.fetchData();
  }

  fetchRecentActivity(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.sharedService.getRecentActivity(this.searchQuery)
      .subscribe((response: any) => {
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

  fetchData(): void {
    this.http.get<any>(this.apiUrl).subscribe(response => {
      if (response && response.result && Array.isArray(response.result)) {
        this.data = response.result;
        this.calculateCaseCounts();
        this.updatePieChart();
      } else {
        console.error('Invalid data received from API:', response);
      }
    }, error => {
      console.error('Error fetching data from API:', error);
    });
  }

  calculateCaseCounts(): void {
    this.totalCases = this.data.length;
    this.assignedCases = this.data.filter(item => item.assigned === 'Y').length;
    this.activeCases = this.data.filter(item => item.assigned === 'N').length;
    this.closedCases = this.data.filter(item => item.closed === 'Y').length;
  }

  updatePieChart(): void {
    this.pieChartOptions.series = [{
      type: 'pie',
      name: 'Distribution',
      data: [
        ['Assigned', this.assignedCases],
        ['Unassigned', this.activeCases]
      ],
      colors: ['#00cfd5', 'blue']
    }];
    Highcharts.chart('container-pie', this.pieChartOptions);
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
