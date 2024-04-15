import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './home/card/card.component';
import { AnalysisComponent } from './home/analysis/analysis.component';
import { GraphComponent } from './home/graph/graph.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { TablesComponent } from './home/tables/tables.component';
import { CaseManagementModule } from './case-management/case-management.module';
import { ContractsModule } from './contracts/contracts.module';
import { DocumentManagementModule } from './document-management/document-management.module';
import { BillingReconciliationModule } from './billing-reconciliation/billing-reconciliation.module';
import { ReportsModule } from './reports/reports.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NewPageComponent } from './new-page/new-page.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    CardComponent,
    AnalysisComponent,
    GraphComponent,
    TablesComponent,
    NewPageComponent,
    // TabComponent
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    HighchartsChartModule,
    ContractsModule,
    CaseManagementModule,
    DocumentManagementModule,
    BillingReconciliationModule,
    ReportsModule,
    ApprovalsModule,
    PaginationModule.forRoot(),
    

    

  



    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
