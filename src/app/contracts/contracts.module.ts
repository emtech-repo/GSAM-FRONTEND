import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractInterComponent } from './contract-inter/contract-inter.component';
import { ContractTabComponent } from './contract-tab/contract-tab.component';


@NgModule({
  declarations: [
    ContractInterComponent,
    ContractTabComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
