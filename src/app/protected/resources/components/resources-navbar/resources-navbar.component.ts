import {Component, OnInit} from '@angular/core';
import * as fromResources from '../../state/resources.reducer';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-resources-navbar',
  templateUrl: './resources-navbar.component.html',
  styles: []
})
export class ResourcesNavbarComponent implements OnInit {

  canCreate = false;

  constructor(private store: Store<fromResources.State>) {
    this.store.select(LanguagesSelectors.hasDefaultLanguage).subscribe(hasDefault => this.canCreate = hasDefault);
  }

  ngOnInit(): void {
  }

}
