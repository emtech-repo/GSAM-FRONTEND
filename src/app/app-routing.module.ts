import { Component, NgModule } from '@angular/core';
import { AuthenticationGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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
import { RetrieveComponent } from './documents/retrieve/retrieve.component';



import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateCaseComponent } from './case-management/create-case/create-case.component';
import { ClaimTabComponent } from './billing-reconciliation/claim-tab/claim-tab.component';
import { ApproveClaimComponent } from './billing-reconciliation/approve-claim/approve-claim.component';
import { AssignPopupComponent } from './case-management/assign-popup/assign-popup.component';
import { SearchCaseComponent } from './case-management/search-case/search-case.component';

import { RecoveryFormComponent } from './case-management/recovery-form/recovery-form.component';
import { DeleteCaseComponent } from './case-management/delete-case/delete-case.component';







export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'Dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LoginComponent,
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
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Cards',
    component: CardsComponent,
    canActivate: [AuthenticationGuard],
  },

  {
    path: 'create-meeting',
    component: CreateMeetingComponent,
    canActivate: [AuthenticationGuard],
  },

  
  {
    path: 'documentation',
    component: DocumentationComponent,
    canActivate: [AuthenticationGuard],
  },
  
  {
    path: 'case-decision',
    component: CaseDecisionComponent,
    canActivate: [AuthenticationGuard],
  },
   { path:'retrieve',
    component:RetrieveComponent
  },
  
  {
    path: 'case-details/:loanAccount',
    component: CaseDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
    {
      path: 'App-analysis',
      
      component: AnalysisComponent,
      canActivate: [AuthenticationGuard],
    },
     {
      path: 'app-loan-account-look-up',    
      component: LoanAccountLookUpComponent,
       canActivate: [AuthenticationGuard],
    },
     {
      path: 'app-create-two',    
      component: CreateTwoComponent,
       canActivate: [AuthenticationGuard],
    },
     {
      path: 'home',    
      component: HomeComponent,
       canActivate: [AuthenticationGuard],
    },
     {
      path: 'assign-case',    
      component: AssignCaseComponent,
       canActivate: [AuthenticationGuard],
    },

  
 

  {
    path: 'app-retrieve:acid',
    component: RetrieveComponent,
    canActivate: [AuthenticationGuard],
  },

 

     {
      path: 'app-forgot-password',    
      component: ForgotPasswordComponent,
       canActivate: [AuthenticationGuard],
    },
      {
      path: 'app-create-case',    
      component: CreateCaseComponent,
        canActivate: [AuthenticationGuard],
    },
  { path: 'dashboard/:cardType',
   component: HomeComponent ,
    canActivate: [AuthenticationGuard],
  },
  
  


     {
      path: 'app-assign-case',    
      component: AssignCaseComponent,
       canActivate: [AuthenticationGuard],
    },

    {
      path: 'app-approve-claim',    
      component: ApproveClaimComponent,
      canActivate: [AuthenticationGuard],
    }, 
     {
      path: 'search-case',    
      component: SearchCaseComponent,
       canActivate: [AuthenticationGuard],
    }, 
    {
      path: 'delete-case',    
      component: DeleteCaseComponent,
       canActivate: [AuthenticationGuard],
    }, 
     {
       path: 'recovery-form',     
      component: RecoveryFormComponent,
       canActivate: [AuthenticationGuard],
    }, 
     
    {
       path: 'app-admin-page',     
      component: AdminPageComponent,
    }, 
    





    {
      path: 'case-management',
      loadChildren: () => import('../app/case-management/case-management.module').then(m => m.CaseManagementModule),
      canActivate: [AuthenticationGuard],
   },

  {
    path: 'approval',
    loadChildren: () => import('../app/approval/approval.module').then(m => m.ApprovalModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'documents',
    loadChildren: () => import('../app/documents/documents.module').then(m => m.DocumentsModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'contracts',
    loadChildren: () => import('../app/contracts/contracts.module').then(m => m.ContractsModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'reports',
    loadChildren: () => import('../app/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'billing-reconciliation',
    loadChildren: () => import('../app/billing-reconciliation/billing-reconciliation.module').then(m => m.BillingReconciliationModule),
    canActivate: [AuthenticationGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }