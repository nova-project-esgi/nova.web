import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeRootComponent } from './home-root/home-root.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [HomeRootComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
