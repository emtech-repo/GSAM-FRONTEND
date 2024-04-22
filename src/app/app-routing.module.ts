import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './auth.guard';
import { CardsComponent } from './home/cards/cards.component';
import { AnalysisComponent } from './home/analysis/analysis.component';
import { CreateMeetingComponent } from './case-management/create-meeting/create-meeting.component'; // Import your CreateMeetingComponent
import { CaseDecisionComponent } from './case-management/case-decision/case-decision.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTabComponent } from './admin-tab/admin-tab.component';
import { CaseDetailsComponent } from './case-management/case-details/case-details.component';


export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
    },
    {
      path: 'Authenticate',
      component: LoginComponent,
    },
    {
      path: 'Dashboard',
      canActivate: [authenticationGuard],
      component: HomeComponent,
    },
    {
      path: 'Cards',
      
      component: CardsComponent,
    },
    {
      path: 'App-analysis',
      
      component: AnalysisComponent,
    },
  {
    path: 'create-meeting',
    component: CreateMeetingComponent
  },
  {
    path: 'case-decision',
    component: CaseDecisionComponent
  },
  {
    path: 'case-details',
    component: CaseDetailsComponent
  },
  {
    path: 'app-admin',
    component: AdminComponent
  },
  {
    path: 'app-admin-tab',
    component: AdminTabComponent
  },
    {
      path: 'case-management',
      loadChildren: () => import('../app/case-management/case-management.module').then(m => m.CaseManagementModule)
   },
  {
    path: 'approval',
    loadChildren: () => import('../app/approval/approval.module').then(m => m.ApprovalModule)
  },
   
{
      path: 'app-case-details',

      component: CaseDetailsComponent,
    },
  
    {
      path: 'create-meeting',

      component: CreateMeetingComponent,
    },

     {
      path: 'case-decision',

      component: CaseDecisionComponent,
    },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
