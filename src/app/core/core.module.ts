import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DateInterceptor} from './interceptors/date.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './effects/user-effects';
import * as userReducer from './reducers/user.reducers';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        CommonModule,
        StoreModule.forRoot({userState: userReducer.reducer}),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([UserEffects])
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
