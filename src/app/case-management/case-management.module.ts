import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCaseComponent } from './search-case/search-case.component';
import { CaseStatusComponent } from './case-status/case-status.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';


import { CaseApprovalComponent } from './case-approval/case-approval.component';
import { CaseTrackingComponent } from './case-tracking/case-tracking.component';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { CaseDecisionComponent } from './case-decision/case-decision.component';
import { DecisionTabComponent } from './decision-tab/decision-tab.component';
import { MeetingTabComponent } from './meeting-tab/meeting-tab.component';
import { NbCardModule } from '@nebular/theme';
import { SharedService } from '../shared.service';




@NgModule({
  declarations: [
    SearchCaseComponent,
    CaseStatusComponent,
    DocumentationComponent,
    CreateMeetingComponent,
    CaseApprovalComponent,
    CaseTrackingComponent,
    CaseDecisionComponent,
    DecisionTabComponent,
    MeetingTabComponent,
    
    
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    HighchartsChartModule,
    PaginationModule.forRoot(),
    FormsModule,
    NbCardModule
  ],
  providers:[
    SharedService
  ],
  
})
export class CaseManagementModule { }
