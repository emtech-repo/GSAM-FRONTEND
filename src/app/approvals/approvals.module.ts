import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalInterfaceComponent } from './approval-interface/approval-interface.component';
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { TabComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';
// import { TabComponent } from '../tabs/tabs.component';



@NgModule({
  declarations: [
  
    TabComponent
    
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    FormsModule
    // TabComponent
    
    
  ]
})
export class ApprovalsModule { }
