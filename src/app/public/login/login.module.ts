import {NgModule} from '@angular/core';
import {LoginRootComponent} from './login-root/login-root.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../../shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginFormComponent} from './login-form/login-form.component';

@NgModule({
  declarations: [LoginRootComponent, LoginPageComponent, LoginFormComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
  ]
})
export class LoginModule {
}
