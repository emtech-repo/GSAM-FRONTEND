import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
<<<<<<< Updated upstream
import { NbCardModule } from '@nebular/theme';
import { SharedService } from './shared.service';
import { FilterPipe } from './filter.pipe';
=======
import { AdminPageComponent } from './admin-page/admin-page.component';

import { AdminPopupComponent } from './admin-popup/admin-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    CardsComponent,
    AnalysisComponent,
    FilterPipe,
    
    
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    HighchartsChartModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ApprovalModule,
<<<<<<< Updated upstream
    NbCardModule
=======
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule
>>>>>>> Stashed changes
    



  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    SharedService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
