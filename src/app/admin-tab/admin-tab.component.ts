import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse{
  data:any[];
  source:any[];
}
@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrl: './admin-tab.component.css'
})
export class AdminTabComponent  implements OnInit{
  UserInfoUrl: ApiResponse = { data: [], source: [] };

 @Input() tabs: { title: string, content: string }[] = [];
  selectedIndex: number = 0;

  
  selectTab(index: number) {
    this.selectedIndex = index;
  }
  
  
 constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getUserInfo().subscribe(
      (data: ApiResponse) => {
        console.log('Data received from API:', data);
        this.UserInfoUrl = data;
        console.log('Assigned JSON Data:', this.UserInfoUrl);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching JSON data:', error);
      }
    
    );
  }
}
