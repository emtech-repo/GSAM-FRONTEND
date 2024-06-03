import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetrieveComponent } from './retrieve/retrieve.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  
  {
    path: 'app-retrieve',
    component: RetrieveComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }