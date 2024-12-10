import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsInterComponent } from './reports-inter/reports-inter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportsInterComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
     FormsModule,
  ]
})
export class ReportsModule { }
