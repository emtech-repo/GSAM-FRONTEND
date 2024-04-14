import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCaseComponent } from './search-case/search-case.component';
import { CaseStatusComponent } from './case-status/case-status.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';

import { RefinanceComponent } from './refinance/refinance.component';
import { RestructureComponent } from './restructure/restructure.component';
import { RecoverComponent } from './recover/recover.component';
import { CaseApprovalComponent } from './case-approval/case-approval.component';
import { CaseTrackingComponent } from './case-tracking/case-tracking.component';
import { CaseManagementRoutingModule } from './case-management-routing.module';



@NgModule({
  declarations: [
    SearchCaseComponent,
    CaseStatusComponent,
    DocumentationComponent,
    CreateMeetingComponent,

    RefinanceComponent,
    RestructureComponent,
    RecoverComponent,
    CaseApprovalComponent,
    CaseTrackingComponent
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule
  ]
})
export class CaseManagementModule { }
