import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CasestatusComponent } from './casestatus/casestatus.component';
import { DecisonApprovalComponent } from './decison-approval/decison-approval.component';
import { DocumentsComponent } from './documents/documents.component';
import { MeetingApprovalComponent } from './meeting-approval/meeting-approval.component';
import { MeetingComponent } from './meeting/meeting.component';
import { RecoverComponent } from './recover/recover.component';
import { RefinanceComponent } from './refinance/refinance.component';
import { RestructureComponent } from './restructure/restructure.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
    },
    {
      path: 'app-search',
      component: SearchComponent,
    },
    {
      path: 'app-casestatus',
      component: CasestatusComponent,
    },
    {
      path: 'app-decison-approval',
      component: DecisonApprovalComponent,
    },
    {
      path: 'app-documents',
      component: DocumentsComponent,
    },
    {
      path: 'app-meeting-approval',
      component: MeetingApprovalComponent,
    },
    {
      path: 'app-meeting',
      component: MeetingComponent,
    },
    {
      path: 'app-recover',
      component: RecoverComponent,
    },
    {
      path: 'app-refinance',
      component: RefinanceComponent,
    },
    {
      path: 'app-restructure',
      component: RestructureComponent,
    },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagementRoutingModule { }
