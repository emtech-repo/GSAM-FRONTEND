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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseDecisionComponent } from './case-decision/case-decision.component';
import { DecisionTabComponent } from './decision-tab/decision-tab.component';
import { MeetingTabComponent } from './meeting-tab/meeting-tab.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CreateTwoComponent } from './create-two/create-two.component';
import { LoanAccountLookUpComponent } from './loan-account-look-up/loan-account-look-up.component';
import { AssignPopupComponent } from './assign-popup/assign-popup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CasesStatusComponent } from './cases-status/cases-status.component';
import { SearchCasesComponent } from './search-cases/search-cases.component';
import { ActiveCasesComponent } from './active-cases/active-cases.component';
import { ClosedCasesComponent } from './closed-cases/closed-cases.component';
import { RecoveryFormComponent } from './recovery-form/recovery-form.component';
import { RefinanceFormComponent } from './refinance-form/refinance-form.component';
import { RestructureFormComponent } from './restructure-form/restructure-form.component';
// import { TotalCasesComponent } from './total-cases/total-cases.component';









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
    AssignCaseComponent,
    CaseDetailsComponent,
    CreateCaseComponent,
    CreateTwoComponent,
    LoanAccountLookUpComponent,
    AssignPopupComponent,
    CasesStatusComponent,

    SearchCasesComponent,
    ActiveCasesComponent,
    ClosedCasesComponent,
    RecoveryFormComponent,
    RefinanceFormComponent,
    RestructureFormComponent,
    

   

    
    
    
    
    
    
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    HighchartsChartModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule



  ]
})
export class CaseManagementModule { }
