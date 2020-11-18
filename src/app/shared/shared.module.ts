import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PagedListComponent} from './components/paged-list/paged-list.component';
import {ElementAutoCompleteComponent} from './components/element-auto-complete/element-auto-complete.component';
import {MaterialModule} from './modules/material.module';

@NgModule({
  declarations: [PagedListComponent, ElementAutoCompleteComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ], exports: [
    ReactiveFormsModule,
    CommonModule,
    PagedListComponent,
    MaterialModule
  ]
})
export class SharedModule {
}
