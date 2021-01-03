import {Component, OnInit, ViewChild} from '@angular/core';
import {EventsFilterComponent} from '../../../events/events-filter/component/events-filter.component';
import {PaginationResume} from '../../../../shared/http/pagination/pagination-resume';
import {trackById} from '../../../../shared/track-by/generic-track-by';
import {Store} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import * as ResourcesActions from '../../../../shared/states/resources/resources.actions';
import * as _ from 'lodash';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import {Payload} from '../../../../shared/redux/payload';
import {PageEvent} from '@angular/material/paginator';
import {DetailedDifficultyEdition} from '../../../../shared/models/difficulties/detailed-difficulty-edition';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';
import * as fromDifficulties from '../../states/difficulties/difficulties.reducer';
import * as DifficultiesActions from '../../states/difficulties/difficulties.actions';
import * as DifficultiesSelectors from '../../states/difficulties/difficulties.selectors';

import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {DifficultiesDifficultyComponent} from '../difficulties-difficulty/difficulties-difficulty.component';
import {DifficultiesFilter} from '../../../../shared/filters/difficulties/difficulties.filter';

@Component({
  selector: 'app-difficulties-list-page',
  templateUrl: './difficulties-list-page.component.html',
  styles: []
})
export class DifficultiesListPageComponent
  extends FormListEditionComponent<DifficultiesDifficultyComponent, DetailedDifficultyWithAvailableActionsDto, DetailedDifficultyEdition>
  implements OnInit {

  @ViewChild(EventsFilterComponent)
  filterComponent: EventsFilterComponent;

  elements: DetailedDifficultyWithAvailableActionsDto[] = [];
  pagination: PaginationResume;

  trackByFn = trackById;
  updateIdx = -1;

  constructor(private store: Store<fromDifficulties.State>, protected fb: FormBuilder) {
    super(fb);
  }

  languages: LanguageDto[];

  ngOnInit(): void {
    this.store.dispatch(ResourcesActions.loadResources());
    this.store.select(DifficultiesSelectors.selectPaginationResume).subscribe(pagination => {
      if (pagination && pagination.page !== null && pagination.size !== null && !_.isEqual(this.pagination, pagination)) {
        this.store.dispatch(DifficultiesActions.loadDifficultiesPageFiltered());
      }
      this.pagination = pagination;
    });
    this.store.select(DifficultiesSelectors.selectDifficulties).subscribe(
      events => {
        if (events) {
          if (this.updateIdx >= 0) {
            this.elements[this.updateIdx] = events[this.updateIdx];
            this.updateIdx = -1;
          } else {
            this.elements = events;
          }
        }
      });
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => this.languages = languages);
    this.store.dispatch(LanguagesActions.loadLanguages());
  }

  onFilterReset(): void {
  }

  getDifficulties(): void {
    this.store.dispatch(DifficultiesActions.loadDifficultiesPageFiltered());
  }

  updateFilter(filter: DifficultiesFilter): void {
    this.store.dispatch(DifficultiesActions.updateFilter(new Payload<DifficultiesFilter>(filter)));
  }

  onPageChange($event: PageEvent): void {
    this.store.dispatch(DifficultiesActions.updatePagination(new Payload<PaginationResume>(PaginationResume.fromPageEvent($event))));
  }

  onDifficultyUpdated(event: DetailedDifficultyEdition, i: number): void {
    this.updateIdx = i;
    this.store.dispatch(DifficultiesActions.updateDifficulty(new Payload<DetailedDifficultyEdition>(event)));
  }

  onDifficultyDeleted(eventId: DetailedDifficultyWithAvailableActionsDto): void {
    this.store.dispatch(DifficultiesActions.deleteDifficulty(new Payload<string>(eventId.id)));
  }


}
