import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DateInterceptor} from './interceptors/date.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './state/user/user.effects';
import * as fromUser from './state/user/user.reducers';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UserModule} from './state/user/user.module';
import {NotificationModule} from './state/notification/notification.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Nova NgRx'
    }),
    EffectsModule.forRoot([]),
    UserModule,
    NotificationModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    StoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
