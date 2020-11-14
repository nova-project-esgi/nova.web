import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeRootComponent} from './public/home/home-root/home-root.component';
import {PublicRootComponent} from './public/public-root/public-root.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PublicRootComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
