import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsInterComponent } from './reports-inter/reports-inter.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: 'app-reports-inter',
    component: ReportsInterComponent,
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
