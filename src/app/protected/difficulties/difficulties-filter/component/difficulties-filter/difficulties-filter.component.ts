import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '../../../../../shared/components/bases/filter.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {merge, Observable} from 'rxjs';
import {LanguageDto} from '../../../../../shared/models/languages/language.dto';
import {Store} from '@ngrx/store';
import * as fromEventsFilter from '../../../../events/events-filter/state/events-filter.reducer';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Payload} from '../../../../../shared/redux/payload';
import * as _ from 'lodash';
import * as LanguagesSelectors from '../../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../../shared/states/languages/languages.actions';
import {StringUtils} from '../../../../../shared/utils/string.utils';
import {DifficultiesFilter} from '../../../../../shared/filters/difficulties/difficulties.filter';
import {DifficultyTranslationNameDto} from '../../../../../shared/models/difficulties/difficulty-translation-name.dto';
import * as DifficultiesFilterSelectors from '../../states/difficulties-filter/difficulties-filter.selectors';
import * as DifficultiesFilterActions from '../../states/difficulties-filter/difficulties-filter.actions';

@Component({
  selector: 'app-difficulties-filter',
  templateUrl: './difficulties-filter.component.html',
  styles: []
})
export class DifficultiesFilterComponent extends FilterComponent<DifficultiesFilter> implements OnInit {

  filterGrp: FormGroup;
  nameCtrl: FormControl;
  languageCtrl: FormControl;

  filteredLanguages: Observable<LanguageDto[]>;
  filteredNames: Observable<DifficultyTranslationNameDto[]>;
  names: DifficultyTranslationNameDto[];

  languages: LanguageDto[];

  nameObs: Observable<DifficultyTranslationNameDto[]>;

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
      this.store.dispatch(DifficultiesFilterActions.updateFilter(new Payload<DifficultiesFilter>(filter)));
    });
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(''),
      map(languageCode => this.handleLanguageValue(languageCode))
    );

    this.filteredNames = merge(
      this.nameCtrl.valueChanges.pipe(
        startWith(''),
        map(name => this.handleNameValue(name))),
      this.nameObs.pipe(
        map(names => {
          this.names = _.assign(names);
          return this.filterNames(this.nameCtrl.value);
        })
      )
    );
  }

  private initForm(): void {
    this.nameCtrl = this.fb.control('');
    this.languageCtrl = this.fb.control('');
    this.filterGrp = this.fb.group({
      name: this.nameCtrl,
      language: this.languageCtrl,
    });
  }

  private handleStore(): void {
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
    this.store.dispatch(LanguagesActions.loadLanguages());

    this.store.select(DifficultiesFilterSelectors.selectFilter).subscribe(filter => {
      if (!_.isEqual(this.filter, filter) && filter.language) {
        this.store.dispatch(DifficultiesFilterActions.loadNames());
      }
      this.filter = filter;
    });
    this.nameObs = this.store.select(DifficultiesFilterSelectors.selectNames);
  }

  private handleLanguageValue(languageCode: string): LanguageDto[] {
    const filteredLanguages = this.filterLanguages(languageCode ?? '');
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

  private filterNames(name: string): DifficultyTranslationNameDto[] {
    return this.names?.filter(t => StringUtils.startWith(t.name.toLowerCase(), name.toLowerCase())) ?? [];
  }

  private handleNameValue(name: string): DifficultyTranslationNameDto[] {
    this.filterChanged.emit({...this.filter, name});
    return this.filterNames(name);
  }

  confirm(): void {
    this.filterConfirmed.emit();
  }
}
