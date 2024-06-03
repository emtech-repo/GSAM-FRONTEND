import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';

import {  FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RetrieveComponent } from './retrieve/retrieve.component';



@NgModule({
  declarations: [

    
    
    RetrieveComponent,
   

  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocumentsModule { }
