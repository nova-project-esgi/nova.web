import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsRootComponent} from '../events/components/events-root/events-root.component';
import {EventsListPageComponent} from '../events/components/events-list-page/events-list-page.component';
import {EventsCreatePageComponent} from '../events/components/events-create-page/events-create-page.component';
import {UsersRootComponent} from './components/users-root/users-root.component';
import {UsersListPageComponent} from './components/users-list-page/users-list-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: '', component: UsersRootComponent, children: [
      {path: 'list', component: UsersListPageComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
