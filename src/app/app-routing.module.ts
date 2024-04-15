import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './auth.guard';
import { CardComponent } from './home/card/card.component';
import { AnalysisComponent } from './home/analysis/analysis.component';
import { GraphComponent } from './home/graph/graph.component';
import { MatIconModule } from '@angular/material/icon';
import { TablesComponent } from './home/tables/tables.component';
import { HighchartsChartComponent } from 'highcharts-angular';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'Dashboard',
      pathMatch: 'full',
    },
    {
      path: 'Authenticate',
      component: LoginComponent,
    },
    {
      path: 'Dashboard',
      canActivate: [authenticationGuard],
      component: HomeComponent,
    },
    {
      path: 'Card',
      component: CardComponent,
    },
    {
      path: 'analysis',
      component: AnalysisComponent,
    },
    {
      path: 'graph',
      component: GraphComponent,
    },
    {
      path: 'tables',
      component: TablesComponent,
    },
    {
      path: 'highcharts',
      component: HighchartsChartComponent,
    },
    {
      path: 'case-management',
      loadChildren: () => import('../app/case-management/case-management.module').then(m => m.CaseManagementModule)
    },
    {
      path: 'approvals',
      loadChildren: () => import('../app/approvals/approvals.module').then(m => m.ApprovalsModule)
    },
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

 })
 export class AppRoutingModule { }
 
