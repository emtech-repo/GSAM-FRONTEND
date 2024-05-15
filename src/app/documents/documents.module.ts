import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SearchDocumentComponent } from './search-document/search-document.component';
import { RequestComponent } from './request/request.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    SearchDocumentComponent,
    RequestComponent,
    RetrieveComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
