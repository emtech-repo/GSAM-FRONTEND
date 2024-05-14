import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './auth.guard';
import { CardsComponent } from './home/cards/cards.component';
import { AnalysisComponent } from './home/analysis/analysis.component';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateMeetingComponent } from './case-management/create-meeting/create-meeting.component'; 
import { CaseDecisionComponent } from './case-management/case-decision/case-decision.component';
import { CaseDetailsComponent } from './case-management/case-details/case-details.component';
import { RegisterComponent } from './register/register.component';
import { DocumentationComponent } from './case-management/documentation/documentation.component';
import { LoanAccountLookUpComponent } from './case-management/loan-account-look-up/loan-account-look-up.component';
import { CreateTwoComponent } from './case-management/create-two/create-two.component';
import { AssignCaseComponent } from './case-management/assign-case/assign-case.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
    },
    { path: 'create-meeting',
   component: CreateMeetingComponent
   },
   { path: 'documentation',
   component: DocumentationComponent
   },
    { path: 'case-decision',
   component: CaseDecisionComponent
   },

    {
      path: 'Authenticate',
      component: LoginComponent,
    },
  {
    path: 'Register',
    component: RegisterComponent,
  },
    {
      path: 'Dashboard',
      // canActivate: [authenticationGuard],
      component: HomeComponent,
    },
    {
      path: 'Cards',
      
      component: CardsComponent,
    },
  {
    path: 'create-meeting',

    component: CreateMeetingComponent,
  },
  {
    path: 'case-decision',

    component: CaseDecisionComponent,
  },
  {
    path: 'case-details',
    component: CaseDetailsComponent
  },
    {
      path: 'App-analysis',
      
      component: AnalysisComponent,
    },
     {
      path: 'app-loan-account-look-up',    
      component: LoanAccountLookUpComponent,
    },
     {
      path: 'app-create-two',    
      component: CreateTwoComponent,
    },
     {
      path: 'home',    
      component: HomeComponent,
    },
     {
      path: 'assign-case',    
      component: AssignCaseComponent,
    },
     {
      path: 'app-forgot-password',    
      component: ForgotPasswordComponent,
    },



 
    {
      path: 'case-management',
      loadChildren: () => import('../app/case-management/case-management.module').then(m => m.CaseManagementModule)
   },
  {
    path: 'approval',
    loadChildren: () => import('../app/approval/approval.module').then(m => m.ApprovalModule)
  },
  // {
  //   path: 'app-admin-page',

  //   component: AdminPageComponent,
  // },
  {
    path: 'app-admin-page',
    canActivate: [authenticationGuard],
    component: AdminPageComponent, 
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
