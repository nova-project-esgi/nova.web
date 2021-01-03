import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DifficultiesListPageComponent} from './components/difficulties-list-page/difficulties-list-page.component';
import {DifficultiesCreatePageComponent} from './components/difficulties-create-page/difficulties-create-page.component';
import {DifficultiesRootComponent} from './components/difficulties-root/difficulties-root.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: '', component: DifficultiesRootComponent, children: [
      {path: 'list', component: DifficultiesListPageComponent},
      {path: 'create', component: DifficultiesCreatePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DifficultiesRoutingModule {
}
