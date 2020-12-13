import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsRootComponent} from './components/events-root/events-root.component';
import {EventsListPageComponent} from './components/events-list-page/events-list-page.component';
import {EventsCreatePageComponent} from './components/events-create-page/events-create-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: '', component: EventsRootComponent, children: [
      {path: 'list', component: EventsListPageComponent},
      {path: 'create', component: EventsCreatePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
