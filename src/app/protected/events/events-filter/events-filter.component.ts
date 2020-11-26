import {Component, Input, OnInit} from '@angular/core';
import {FilterComponent} from '../../../shared/components/bases/filter.component';
import {TranslatedEventsTitleFilter} from '../../../shared/filters/events/translated-events-title.filter';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {forkJoin, merge, Observable} from 'rxjs';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {map, startWith} from 'rxjs/operators';
import {StringUtils} from '../../../shared/utils/string.utils';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {EventTranslationTitleDto} from '../../../shared/models/events/event-translation-title.dto';


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
  titlesCopy: EventTranslationTitleDto[];

  @Input() languages: LanguageDto[];

  @Input() titlesObs: Observable<EventTranslationTitleDto[]>;

  confirmDisabled = true;

  constructor(private fb: FormBuilder) {
    super();
  }


  ngOnInit(): void {
    this.titleCtrl = this.fb.control('');
    this.languageCtrl = this.fb.control('');
    this.filterGrp = this.fb.group({
      name: this.titleCtrl,
      language: this.languageCtrl,
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
          this.titlesCopy = titles;
          return this.handleTitles(this.titleCtrl.value);
        })
      )
    );
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
    return this.languages.filter(l => StringUtils.startWith(l.displayCode.toLowerCase(), languageCode.toLowerCase()));
  }

  private handleTitles(title: string): EventTranslationTitleDto[] {
    const filteredValues = this.filterTitles(title);
    this.confirmDisabled = filteredValues.length === 0;
    return filteredValues;
  }

  private filterTitles(title: string): EventTranslationTitleDto[] {
    return this.titlesCopy?.filter(t => StringUtils.startWith(t.title.toLowerCase(), title.toLowerCase())) ?? [];
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent): void {
    this.filterCopy.language = $event.option.value;
    this.titleCtrl.enable({emitEvent: false});
  }

  private handleTitleValue(title: string): EventTranslationTitleDto[] {
    this.filterCopy.title = title;
    this.filterChanged.emit(this.filterCopy);
    return this.filterTitles(title);

  }

  confirm(): void {
    this.filterConfirmed.emit();
  }
}

