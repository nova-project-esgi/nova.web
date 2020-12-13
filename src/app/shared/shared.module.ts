import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PagedListComponent} from './components/paged-list/paged-list.component';
import {ElementAutoCompleteComponent} from './components/element-auto-complete/element-auto-complete.component';
import {MaterialModule} from './modules/material.module';
import {LanguagesModule} from './languages/languages.module';
import { DimensionsDirective } from './directives/dimensions.directive';
import {ValidCtrlSubmitComponent} from './components/valid-ctrl-submit/valid-ctrl-submit.component';
import { NgReachDirective } from './directives/ng-reach.directive';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageEditComponent} from './components/image-edit/image-edit.component';

@NgModule({
  declarations: [PagedListComponent, ElementAutoCompleteComponent, DimensionsDirective, ValidCtrlSubmitComponent, NgReachDirective, ImageEditComponent ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgxFileDropModule,
    ImageCropperModule,

  ], exports: [
    ReactiveFormsModule,
    CommonModule,
    PagedListComponent,
    MaterialModule,
    DimensionsDirective,
    NgReachDirective,
    NgxFileDropModule,
    ImageCropperModule,
    ImageEditComponent
  ]
})
export class SharedModule {
}
