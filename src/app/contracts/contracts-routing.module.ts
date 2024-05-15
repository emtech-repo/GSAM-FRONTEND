import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractInterComponent } from './contract-inter/contract-inter.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: 'app-contract-inter',
    component: ContractInterComponent,
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
