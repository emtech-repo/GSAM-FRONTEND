import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalInterfaceComponent } from './approval-interface/approval-interface.component';

import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApprovalInterfaceComponent,
     TabsComponent 
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    FormsModule
    

  ]
})
export class ApprovalModule { }
