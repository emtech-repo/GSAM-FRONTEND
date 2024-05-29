import { NgModule } from '@angular/core';
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
import { SearchdocumentComponent } from './documents/searchdocument/searchdocument.component';
import { RequestComponent } from './documents/request/request.component';
import { RetrieveComponent } from './documents/retrieve/retrieve.component';
import { UploadComponent } from './documents/upload/upload.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateCaseComponent } from './case-management/create-case/create-case.component';
import { ClaimTabComponent } from './billing-reconciliation/claim-tab/claim-tab.component';
import { ApproveClaimComponent } from './billing-reconciliation/approve-claim/approve-claim.component';
import { AssignPopupComponent } from './case-management/assign-popup/assign-popup.component';
import { SearchCaseComponent } from './case-management/search-case/search-case.component';
import { authenticationGuard } from './auth.guard'; // Import your authentication guard here

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full'
  },
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
    canActivate: [authenticationGuard],
    component: HomeComponent,
  },
  {
    path: 'Cards',
    canActivate: [authenticationGuard],
    component: CardsComponent,
  },
  {
    path: 'create-meeting',
    canActivate: [authenticationGuard],
    component: CreateMeetingComponent,
  },
  {
    path: 'documentation',
    canActivate: [authenticationGuard],
    component: DocumentationComponent,
  },
  {
    path: 'case-decision',
    canActivate: [authenticationGuard],
    component: CaseDecisionComponent,
  },
  {
    path: 'case-details/:loanAccount',
    canActivate: [authenticationGuard],
    component: CaseDetailsComponent,
  },
  {
    path: 'App-analysis',
    canActivate: [authenticationGuard],
    component: AnalysisComponent,
  },
  {
    path: 'app-loan-account-look-up',
    canActivate: [authenticationGuard],
    component: LoanAccountLookUpComponent,
  },
  {
    path: 'app-create-two',
    canActivate: [authenticationGuard],
    component: CreateTwoComponent,
  },
  {
    path: 'home',
    canActivate: [authenticationGuard],
    component: HomeComponent,
  },
  {
    path: 'assign-case',
    canActivate: [authenticationGuard],
    component: AssignCaseComponent,
  },
  {
    path: 'searchdocument',
    canActivate: [authenticationGuard],
    component: SearchdocumentComponent,
  },
  {
    path: 'app-request',
    component: RequestComponent,
  },
  {
    path: 'app-retrieve',
    canActivate: [authenticationGuard],
    component: RetrieveComponent,
  },
  {
    path: 'app-upload',
    canActivate: [authenticationGuard],
    component: UploadComponent,
  },
  {
    path: 'app-forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'app-create-case',
    canActivate: [authenticationGuard],
    component: CreateCaseComponent,
  },
  {
    path: 'dashboard/:cardType',
    canActivate: [authenticationGuard],
    component: HomeComponent
  },
  {
    path: 'app-assign-case',
    canActivate: [authenticationGuard],
    component: AssignCaseComponent,
  },
  {
    path: 'app-approve-claim',
    canActivate: [authenticationGuard],
    component: ApproveClaimComponent,
  },
  {
    path: 'search-case',
    canActivate: [authenticationGuard],
    component: SearchCaseComponent,
  },
  {
    path: 'app-admin-page',
    canActivate: [authenticationGuard],
    component: AdminPageComponent,
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
    path: 'documents',
    loadChildren: () => import('../app/documents/documents.module').then(m => m.DocumentsModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('../app/contracts/contracts.module').then(m => m.ContractsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('../app/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'billing-reconciliation',
    loadChildren: () => import('../app/billing-reconciliation/billing-reconciliation.module').then(m => m.BillingReconciliationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
