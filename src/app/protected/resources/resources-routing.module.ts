import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResourcesRootComponent} from './components/resources-root/resources-root.component';
import {ResourcesListPageComponent} from './components/resources-list-page/resources-list-page.component';
import {ResourcesCreatePageComponent} from './components/resources-create-page/resources-create-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: '', component: ResourcesRootComponent, children: [
      {path: 'list', component: ResourcesListPageComponent},
      {path: 'create', component: ResourcesCreatePageComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
