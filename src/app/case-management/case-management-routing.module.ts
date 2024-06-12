import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseApprovalComponent } from './case-approval/case-approval.component';
import { CaseStatusComponent } from './case-status/case-status.component';
import { CaseTrackingComponent } from './case-tracking/case-tracking.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { DocumentationComponent } from './documentation/documentation.component';

import { SearchCaseComponent } from './search-case/search-case.component';
import { CaseDecisionComponent } from './case-decision/case-decision.component';
import { DecisionTabComponent } from './decision-tab/decision-tab.component';
import { MeetingTabComponent } from './meeting-tab/meeting-tab.component';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CreateTwoComponent } from './create-two/create-two.component';
import { CasesStatusComponent } from './cases-status/cases-status.component';
import { SearchCasesComponent } from './search-cases/search-cases.component';

import { TotalCasesComponent } from './total-cases/total-cases.component';
import { ClosedCasesComponent } from './closed-cases/closed-cases.component';
import { ActiveCasesComponent } from './active-cases/active-cases.component';
import { DeleteCaseComponent } from './delete-case/delete-case.component';




export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
    },
  {
    path: 'app-total-cases',
    component: TotalCasesComponent
  },
  {
    path: 'app-active-cases',
    component: ActiveCasesComponent
  },
  {
    path: 'app-closed-cases',
    component: ClosedCasesComponent
  },
    
    {
      path: 'app-case-approval',
      
      component:CaseApprovalComponent,
    },
    
    {
      path: 'app-case-status',
      
      component:CaseStatusComponent,
    },
    {
    path: 'app-cases-status',

    component: CasesStatusComponent,
  },

    
    
    {
      path: 'app-case-tracking',
      
      component:CaseTrackingComponent,
    },
    
    {
      path: 'app-create-meeting',
      
      component:CreateMeetingComponent,
    },
  {
    path: 'app-meeting- tab',

    component: MeetingTabComponent,
  },
    
    {
      path: 'app-documentation',
      
      component:DocumentationComponent,
    },
    
    {
      path: 'app-search-case',
      
      component:SearchCaseComponent,
    },
    {
      path: 'app-case-decision',

      component: CaseDecisionComponent,
    },
    {
      path: 'app-decision-tab',

      component: DecisionTabComponent,
    },
  {
    path: 'app-assign-case',
    component: AssignCaseComponent,
  },
  {
    path: 'app-case-details',
    component: CaseDetailsComponent,
  },
  {
      path: 'app-create-case',
      
      component:CreateCaseComponent,
    },
     {
      path: 'app-create-two',
      
      component:CreateTwoComponent,
    },
      {
      path: 'app-search-cases',
      
      component:SearchCasesComponent,
    },
     {
      path: 'delete-case',
      
      component:DeleteCaseComponent,
    },
     
    
    
    
     
  
    
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagementRoutingModule { }
