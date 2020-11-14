import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {LoginRoutingModule} from '../public/login/login-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule
  ], exports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule
  ]
})
export class SharedModule {
}
