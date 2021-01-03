import {Component, OnInit} from '@angular/core';
import {LanguagesFilter} from '../../../../shared/filters/languages/languages.filter';
import {Store} from '@ngrx/store';
import * as fromLanguages from '../../../../shared/states/languages/languages.reducer';
import * as LanguagesSelectors from '../../state/languages.selectors';
import * as LanguagesActions from '../../state/languages.actions';
import {Payload} from '../../../../shared/redux/payload';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {PageEvent} from '@angular/material/paginator';
import * as _ from 'lodash';
import {trackById} from '../../../../shared/track-by/generic-track-by';
import {LanguageWithAvailableActionsDto} from '../../../../shared/models/languages/language-with-available-actions.dto';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {LanguagesLanguageComponent} from '../languages-language/languages-language.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-language-list-page',
  templateUrl: './language-list-page.component.html',
  styles: []
})
export class LanguageListPageComponent extends FormListEditionComponent<LanguagesLanguageComponent, LanguageWithAvailableActionsDto> implements OnInit{

  constructor(private store: Store<fromLanguages.State>, protected fb: FormBuilder) {
    super(fb);
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
  }

  languages: LanguageWithAvailableActionsDto[] = [];
  pagination: PaginationResume;

  trackByFn = trackById;

  ngOnInit(): void {
    this.store.select(LanguagesSelectors.selectPaginationResume).subscribe(pagination => {
      if (pagination && pagination.page !== null && pagination.size !== null && !_.isEqual(this.pagination, pagination)) {
        this.store.dispatch(LanguagesActions.loadLanguagesPageFiltered());
      }
      this.pagination = pagination;
    });
    this.store.select(LanguagesSelectors.selectIsDeleted).subscribe(isDeleted => {
      if (isDeleted) {
        this.store.dispatch(LanguagesActions.loadLanguagesPageFiltered());
      }
    });
  }

  onFilterReset(): void {

  }

  updateFilter(filter: LanguagesFilter): void {
    this.store.dispatch(LanguagesActions.updateFilter(new Payload<LanguagesFilter>(filter)));
  }

  getLanguages(): void {
    this.store.dispatch(LanguagesActions.loadLanguagesPageFiltered());
  }

  onPageChange($event: PageEvent): void {
    this.store.dispatch(LanguagesActions.updatePagination(new Payload<PaginationResume>(PaginationResume.fromPageEvent($event))));
  }

  onLanguageDeleted(eventId: string): void {
    this.store.dispatch(LanguagesActions.deleteLanguage(new Payload<string>(eventId)));
  }

  onLanguageUpdated(language: LanguageWithAvailableActionsDto): void {
    this.store.dispatch(LanguagesActions.updateLanguage(new Payload<LanguageWithAvailableActionsDto>(language)));
  }
}
