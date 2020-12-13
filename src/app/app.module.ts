import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {PublicModule} from './public/public.module';
import {ProtectedModule} from './protected/protected.module';
import {SharedModule} from './shared/shared.module';
import {ImageEditComponent} from './shared/components/image-edit/image-edit.component';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        PublicModule,
        ProtectedModule,
        AppRoutingModule,
        SharedModule,
    ],
  entryComponents: [
    ImageEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
