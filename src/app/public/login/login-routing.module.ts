import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginRootComponent} from './login-root/login-root.component';

const routes: Routes = [
  {
    path: '', component: LoginRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
