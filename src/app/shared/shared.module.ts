// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe'; // Adjust the path as necessary

@NgModule({
 declarations: [
    FilterPipe
 ],
 imports: [
    CommonModule
 ],
 exports: [
    FilterPipe
 ]
})
export class SharedModule { }
