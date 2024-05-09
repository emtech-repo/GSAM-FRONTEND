import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalInterfaceComponent } from './approval-interface/approval-interface.component';

const routes: Routes = [
  {
    path: 'app-approval-interface',
    component: ApprovalInterfaceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
