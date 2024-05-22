import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { SearchdocumentComponent } from './searchdocument/searchdocument.component';
import { UploadComponent } from './upload/upload.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { RequestComponent } from './request/request.component';



@NgModule({
  declarations: [

    SearchdocumentComponent,
    UploadComponent,
    RetrieveComponent,
    RequestComponent

  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule
  ]
})
export class DocumentsModule { }
