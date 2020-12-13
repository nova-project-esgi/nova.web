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
import * as LanguagesSelectors from '../../../../shared/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/languages/languages.actions';
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

  confirmDisabled = true;
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
          return this.handleTitles(this.titleCtrl.value);
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
    this.store.select(EventsFilterSelectors.selectLanguages).subscribe(languages => {
      if (languages?.length === 0) {
        this.store.dispatch(EventsFilterActions.loadLanguages());
      } else {
        this.languages = languages;
      }
    });
    this.store.select(EventsFilterSelectors.selectFilter).subscribe(filter => {
      this.filter = filter;
      if (this.filter.language && this.filter.title) {
        this.store.dispatch(EventsFilterActions.loadTitles());
      }
    });
    this.titlesObs = this.store.select(EventsFilterSelectors.selectTitles);
  }

  private handleLanguageValue(languageCode: string): LanguageDto[] {
    const filteredLanguages = this.filterLanguages(languageCode ?? '');
    if (filteredLanguages.length === 0 || filteredLanguages[0].displayCode !== languageCode) {
      this.titleCtrl.disable({emitEvent: false});
    }
    return filteredLanguages;
  }

  reset(): void {
    this.filterGrp.reset();
    this.filterReset.emit(true);
  }

  onFilterChanged<K extends keyof TranslatedEventsTitleFilter>(key: K, val: TranslatedEventsTitleFilter[K]): void {
    this.emitFilterChanged(key, val);
  }

  private filterLanguages(languageCode: string): LanguageDto[] {
    return this.languages?.filter(l => StringUtils.startWith(l.displayCode.toLowerCase(), languageCode.toLowerCase())) ?? [];
  }

  private handleTitles(title: string): EventTranslationTitleDto[] {
    const filteredValues = this.filterTitles(title);
    this.confirmDisabled = filteredValues.length === 0;
    return filteredValues;
  }

  private filterTitles(title: string): EventTranslationTitleDto[] {
    return this.titles?.filter(t => StringUtils.startWith(t.title.toLowerCase(), title.toLowerCase())) ?? [];
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent): void {
    this.filter.language = $event.option.value;
    this.titleCtrl.enable({emitEvent: false});
  }

  private handleTitleValue(title: string): EventTranslationTitleDto[] {
    this.filter.title = title;
    this.filterChanged.emit(this.filter);
    return this.filterTitles(title);
  }

  confirm(): void {
    this.filterConfirmed.emit();
  }
}

