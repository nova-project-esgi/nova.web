import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PagedListComponent} from './components/paged-list/paged-list.component';
import {ElementAutoCompleteComponent} from './components/element-auto-complete/element-auto-complete.component';
import {MaterialModule} from './modules/material.module';
import {LanguagesModule} from './states/languages/languages.module';
import {DimensionsDirective} from './directives/dimensions.directive';
import {ValidCtrlSubmitComponent} from './components/valid-ctrl-submit/valid-ctrl-submit.component';
import {NgReachDirective} from './directives/ng-reach.directive';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageEditComponent} from './components/image-edit/image-edit.component';
import {ImageDropComponent} from './components/image-drop/image-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FilteredListComponent} from './components/filtered-list/filtered-list.component';
import {ResourcesModule} from './states/resources/resources.module';
import {DifficultiesModule} from './states/difficulties/difficulties.module';

@NgModule({
  declarations: [
    PagedListComponent,
    ElementAutoCompleteComponent,
    DimensionsDirective,
    ValidCtrlSubmitComponent,
    NgReachDirective,
    ImageEditComponent,
    ImageDropComponent,
    FilteredListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    DragDropModule,
    NgxFileDropModule,
    ImageCropperModule,
    LanguagesModule,
    ResourcesModule,
    DifficultiesModule
  ], exports: [
    ReactiveFormsModule,
    CommonModule,
    PagedListComponent,
    MaterialModule,
    DimensionsDirective,
    NgReachDirective,
    DragDropModule,
    NgxFileDropModule,
    ImageCropperModule,
    ImageEditComponent,
    LanguagesModule,
    ResourcesModule,
    ImageDropComponent,
    FilteredListComponent,
    DifficultiesModule
  ]
})
export class SharedModule {
}
