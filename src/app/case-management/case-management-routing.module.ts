import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseApprovalComponent } from './case-approval/case-approval.component';
import { CaseStatusComponent } from './case-status/case-status.component';
import { CaseTrackingComponent } from './case-tracking/case-tracking.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { RecoverComponent } from './recover/recover.component';
import { RefinanceComponent } from './refinance/refinance.component';
import { RestructureComponent } from './restructure/restructure.component';
import { SearchCaseComponent } from './search-case/search-case.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
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
      path: 'app-case-tracking',
      
      component:CaseTrackingComponent,
    },
    
    {
      path: 'app-create-meeting',
      
      component:CreateMeetingComponent,
    },
    
    {
      path: 'app-documentation',
      
      component:DocumentationComponent,
    },
    {
      path: 'app-recover',
      
      component:RecoverComponent,
    },
    {
      path: 'app-refinance',
      
      component:RefinanceComponent,
    },
    {
      path: 'app-restructure',
      
      component:RestructureComponent,
    },
    {
      path: 'app-search-case',
      
      component:SearchCaseComponent,
    },
    
    
    
    
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagementRoutingModule { }
