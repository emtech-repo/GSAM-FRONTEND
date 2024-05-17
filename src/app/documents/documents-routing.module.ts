import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { UploadComponent } from './upload/upload.component';
import { SearchdocumentComponent } from './searchdocument/searchdocument.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: 'app-request',
    component: RequestComponent,
  },
  {
    path: 'app-retrieve',
    component: RetrieveComponent,
  },
  
  {
    path: 'app-upload',
    component: UploadComponent,
  },
  {
    path: 'app-searchdocument',
    component: SearchdocumentComponent,
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }