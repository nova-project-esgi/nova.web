import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LanguagesRootComponent} from './components/languages-root/languages-root.component';
import {LanguageListPageComponent} from './components/language-list-page/language-list-page.component';
import {LanguagesCreatePageComponent} from './components/languages-create-page/languages-create-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: '', component: LanguagesRootComponent, children: [
      {path: 'list', component: LanguageListPageComponent},
      {path: 'create', component: LanguagesCreatePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
