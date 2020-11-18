import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsRootComponent} from './events-root/events-root.component';

const routes: Routes = [
  {
    path: '', component: EventsRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
