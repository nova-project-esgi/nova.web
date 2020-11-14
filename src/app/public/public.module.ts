import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicRootComponent } from './public-root/public-root.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [PublicRootComponent],
  imports: [
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
