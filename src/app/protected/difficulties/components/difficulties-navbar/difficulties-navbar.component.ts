import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as fromDifficulties from '../../states/difficulties/difficulties.reducer'

@Component({
  selector: 'app-difficulties-navbar',
  templateUrl: './difficulties-navbar.component.html',
  styles: [
  ]
})
export class DifficultiesNavbarComponent implements OnInit {


  canCreate = false;

  constructor(private store: Store<fromDifficulties.State>) {
    this.store.select(LanguagesSelectors.hasDefaultLanguage).subscribe(hasDefault => this.canCreate = hasDefault);
  }

  ngOnInit(): void {
  }


}
