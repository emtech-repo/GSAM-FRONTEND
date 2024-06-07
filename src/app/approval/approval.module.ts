import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalInterfaceComponent } from './approval-interface/approval-interface.component';

import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { RequestsComponent } from './requests/requests.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [
    ApprovalInterfaceComponent,
     TabsComponent,
     RequestsComponent 

     
  ],
  imports: [
    CommonModule,
     ApprovalRoutingModule,
    FormsModule,
    NbCardModule,
    NgxPaginationModule,
    PaginationModule
    
    

  ]
})
export class ApprovalModule { }
