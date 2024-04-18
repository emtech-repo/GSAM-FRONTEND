// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { NbCardModule } from '@nebular/theme';
//  interface ApiResponse{
//   data:any[];
//  }
// @Component({
//   selector: 'app-documentation',
//   templateUrl: './documentation.component.html',
//   styleUrls: ['./documentation.component.css']
// })
// export class DocumentationComponent implements OnInit {
//   public getJsonValue:any;
//   public postJsonValue:any;
// filteredData: any;
// jsonData: any;
//   constructor(private http:HttpClient){}
//   ngOnInit(): void {
//     this.getMethod();
//     this.postMethod();
//   }
//   postMethod() {
//     throw new Error('Method not implemented.');
//   }
//   public getMethod(){
//     this.http.get<ApiResponse>('https://datausa.io/api/data?drilldowns=Nation&measures=Population').subscribe((data:ApiResponse)=>{
//       console.log(data);
//       this.getJsonValue=data;
//       this.jsonData=data.data;
//     }
  
//   );
//   }

  
// }


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

interface ApiResponse {
  data: any[];
}

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue: any;
  filteredData: any;
  jsonData: any;
  searchQuery:any;

  // Search functionality
  searchText: string = '';

  // Pagination functionality
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMethod();
    this.postMethod();
  }

  postMethod() {
    // Implement your post method logic here
  }

  public getMethod() {
    this.http.get<ApiResponse>('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .subscribe((data: ApiResponse) => {
        console.log(data);
        this.getJsonValue = data;
        this.jsonData = data.data;
      });
  }

  // Search functionality
  applyFilter() {
    this.currentPage = 1; // Reset current page to 1
    this.filteredData = this.jsonData.filter((item: any) =>
      Object.values(item).some((val: any) => val.toString().toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
  

  // Pagination functionality
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
}
