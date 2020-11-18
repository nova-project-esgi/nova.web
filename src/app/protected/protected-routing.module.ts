import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProtectedRootComponent} from './protected-root/protected-root.component';
import {AuthGuardService} from '../core/guards/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: ProtectedRootComponent, canActivate: [AuthGuardService], children: [
      {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
