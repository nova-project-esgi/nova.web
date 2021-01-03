import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '../../../../shared/components/bases/filter.component';
import {TranslatedEventsTitleFilter} from '../../../../shared/filters/events/translated-events-title.filter';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {merge, Observable} from 'rxjs';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {StringUtils} from '../../../../shared/utils/string.utils';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {EventTranslationTitleDto} from '../../../../shared/models/events/event-translation-title.dto';
import * as fromEventsFilter from '../state/events-filter.reducer';
import * as EventsFilterSelectors from '../state/events-filter.selectors';
import * as EventsFilterActions from '../state/events-filter.actions';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import {Store} from '@ngrx/store';
import {Payload} from '../../../../shared/redux/payload';
import * as _ from 'lodash';


@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styles: []
})
export class EventsFilterComponent extends FilterComponent<TranslatedEventsTitleFilter> implements OnInit {

  filterGrp: FormGroup;
  titleCtrl: FormControl;
  languageCtrl: FormControl;

  filteredLanguages: Observable<LanguageDto[]>;
  filteredTitles: Observable<EventTranslationTitleDto[]>;
  titles: EventTranslationTitleDto[];

  languages: LanguageDto[];

  titlesObs: Observable<EventTranslationTitleDto[]>;

  constructor(private fb: FormBuilder, private store: Store<fromEventsFilter.State>) {
    super();
  }

  ngOnInit(): void {
    this.handleStore();
    this.initForm();
    this.handleFilterEdition();
  }


  private handleFilterEdition(): void {
    this.filterChanged.pipe(
      debounceTime(100)
    ).subscribe(filter => {
      this.store.dispatch(EventsFilterActions.updateFilter(new Payload<TranslatedEventsTitleFilter>(filter)));
    });
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(''),
      map(languageCode => this.handleLanguageValue(languageCode))
    );

    this.filteredTitles = merge(
      this.titleCtrl.valueChanges.pipe(
        startWith(''),
        map(title => this.handleTitleValue(title))),
      this.titlesObs.pipe(
        map(titles => {
          this.titles = _.assign(titles);
          return this.filterTitles(this.titleCtrl.value);
        })
      )
    );
  }

  private initForm(): void {
    this.titleCtrl = this.fb.control('');
    this.languageCtrl = this.fb.control('');
    this.filterGrp = this.fb.group({
      name: this.titleCtrl,
      language: this.languageCtrl,
    });
  }

  private handleStore(): void {
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
    this.store.dispatch(LanguagesActions.loadLanguages());

    this.store.select(EventsFilterSelectors.selectFilter).subscribe(filter => {
      if (!_.isEqual(this.filter, filter) && filter.language) {
        this.store.dispatch(EventsFilterActions.loadTitles());
      }
      this.filter = filter;
    });
    this.titlesObs = this.store.select(EventsFilterSelectors.selectTitles);
  }

  private handleLanguageValue(languageCode: string): LanguageDto[] {
    const filteredLanguages = this.filterLanguages(languageCode ?? '');
    if (filteredLanguages.length === 0 || filteredLanguages[0].displayCode !== languageCode) {
      this.titleCtrl.disable({emitEvent: false});
    }
    this.filterChanged.emit({...this.filter, language: languageCode});
    return filteredLanguages;
  }

  reset(): void {
    this.filterGrp.reset();
    this.filterReset.emit(true);
  }

  private filterLanguages(languageCode: string): LanguageDto[] {
    return this.languages?.filter(l => StringUtils.startWith(l.displayCode.toLowerCase(), languageCode.toLowerCase())) ?? [];
  }

  private filterTitles(title: string): EventTranslationTitleDto[] {
    return this.titles?.filter(t => StringUtils.startWith(t.title.toLowerCase(), title.toLowerCase())) ?? [];
  }


  private handleTitleValue(title: string): EventTranslationTitleDto[] {
    this.filterChanged.emit({...this.filter, title});
    return this.filterTitles(title);
  }

  confirm(): void {
    this.filterConfirmed.emit();
  }
}

