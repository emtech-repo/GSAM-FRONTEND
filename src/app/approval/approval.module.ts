import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalInterfaceComponent } from './approval-interface/approval-interface.component';

import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    ApprovalInterfaceComponent,
     TabsComponent 

     
  ],
  imports: [
    CommonModule,
     ApprovalRoutingModule,
    FormsModule,
    NbCardModule,
  PaginationModule.forRoot(),
    
    

  ]
})
export class ApprovalModule { }
