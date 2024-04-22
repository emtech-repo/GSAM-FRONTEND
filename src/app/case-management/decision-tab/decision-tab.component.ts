import { Component,Input} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

interface ApiResponse{
  data:any[];
  source:any[];
}

@Component({
  selector: 'app-decision-tab',
  templateUrl: './decision-tab.component.html',
  styleUrl: './decision-tab.component.css'
})
export class DecisionTabComponent {
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
