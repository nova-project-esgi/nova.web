import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromEvents from '../../state/events.reducer';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
@Component({
  selector: 'app-events-navbar',
  templateUrl: './events-navbar.component.html',
  styles: [
  ]
})
export class EventsNavbarComponent implements OnInit {

  canCreate = false;
  constructor(private store: Store<fromEvents.State>) {
    this.store.select(LanguagesSelectors.hasDefaultLanguage).subscribe(hasDefault => this.canCreate = hasDefault);
  }

  ngOnInit(): void {
  }

}
