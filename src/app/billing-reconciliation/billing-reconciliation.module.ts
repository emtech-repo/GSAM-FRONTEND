import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingReconciliationRoutingModule } from './billing-reconciliation-routing.module';
import { RequestServiceComponent } from './request-service/request-service.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { ClaimTabComponent } from './claim-tab/claim-tab.component';
import { ApproveClaimComponent } from './approve-claim/approve-claim.component';


@NgModule({
  declarations: [
    RequestServiceComponent,
    ViewRequestsComponent,
    CreateClaimComponent,
    ViewClaimsComponent,
    ClaimTabComponent,
    ApproveClaimComponent
  ],
  imports: [
    CommonModule,
    BillingReconciliationRoutingModule
  ]
})
export class BillingReconciliationModule { }
