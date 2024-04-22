import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr'; 




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsComponent } from './home/cards/cards.component';
import { AnalysisComponent } from './home/analysis/analysis.component';

import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApprovalModule } from './approval/approval.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminTabComponent } from './admin-tab/admin-tab.component';

import { AdminPopupComponent } from './admin-popup/admin-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    CardsComponent,
    AnalysisComponent,
    AdminPageComponent,
    AdminTabComponent,
    AdminPopupComponent,
    
    
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    HighchartsChartModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ApprovalModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    



  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
