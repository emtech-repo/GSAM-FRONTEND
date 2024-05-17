import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { RequestServiceComponent } from './request-service/request-service.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: 'app-create-claim',
    component: CreateClaimComponent,
  },
  {
    path: 'app-view-claims',
    component: ViewClaimsComponent,
  },
  {
    path: 'app-request-service',
    component: RequestServiceComponent,
  },
  {
    path: 'app-view-requests',
    component: ViewRequestsComponent,
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingReconciliationRoutingModule { }
