import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { RetrieveComponent } from './retrieve/retrieve.component';



@NgModule({
  declarations: [

    
    
    RetrieveComponent,
   

  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule
  ]
})
export class DocumentsModule { }
