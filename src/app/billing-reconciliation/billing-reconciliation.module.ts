import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingReconciliationRoutingModule } from './billing-reconciliation-routing.module';
import { RequestServiceComponent } from './request-service/request-service.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';


@NgModule({
  declarations: [
    RequestServiceComponent,
    ViewRequestsComponent,
    CreateClaimComponent,
    ViewClaimsComponent
  ],
  imports: [
    CommonModule,
    BillingReconciliationRoutingModule
  ]
})
export class BillingReconciliationModule { }
