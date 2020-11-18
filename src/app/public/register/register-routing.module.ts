import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterRootComponent} from './register-root/register-root.component';

const routes: Routes = [
  {
    path: '', component: RegisterRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
