import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CasestatusComponent } from './casestatus/casestatus.component';
import { DocumentsComponent } from './documents/documents.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingApprovalComponent } from './meeting-approval/meeting-approval.component';
import { RefinanceComponent } from './refinance/refinance.component';
import { RestructureComponent } from './restructure/restructure.component';
import { RecoverComponent } from './recover/recover.component';
import { DecisonApprovalComponent } from './decison-approval/decison-approval.component';
import { CaseTrackingComponent } from './case-tracking/case-tracking.component';
import { CaseManagementRoutingModule } from './case-management-routing.module';



@NgModule({
  declarations: [
    SearchComponent,
    CasestatusComponent,
    DocumentsComponent,
    MeetingComponent,
    MeetingApprovalComponent,
    RefinanceComponent,
    RestructureComponent,
    RecoverComponent,
    DecisonApprovalComponent,
    CaseTrackingComponent
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule
  ]
})
export class CaseManagementModule { }
