import {Component, Input, OnInit} from '@angular/core';
import {FilterComponent} from '../../../shared/bases/filter.component';
import {TranslatedEventsFilter} from '../../../shared/filters/translated-events.filter';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {LanguageDto} from '../../../shared/models/languages/language.dto';
import {map, startWith} from 'rxjs/operators';
import {StringUtils} from '../../../shared/utils/string.utils';


@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styles: []
})
export class EventsFilterComponent extends FilterComponent<TranslatedEventsFilter> implements OnInit {

  filterGrp: FormGroup;
  titleCtrl: FormControl;
  languageCtrl: FormControl;

  filteredLanguages: Observable<LanguageDto[]>;
  filteredTitles: Observable<string[]>;

  @Input() languages: LanguageDto[];
  @Input() eventTitles: string[];

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
    this.titleCtrl.valueChanges.subscribe(value => this.onFilterChanged('title', value));
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(''),
      map(languageCode => this.filterLanguages(languageCode))
    );
  }

  reset(): void {
    this.filterGrp.reset();
    this.filterReset.emit(true);
  }

  onFilterChanged<K extends keyof TranslatedEventsFilter>(key: K, val: TranslatedEventsFilter[K]): void {
    this.emitFilterChanged(key, val);
  }

  private filterLanguages(languageCode: string): LanguageDto[] {
    const filteredLanguages = this.languages.filter(l => StringUtils.startWith(l.displayCode.toLowerCase(), languageCode.toLowerCase()));
    if (filteredLanguages.length > 0 && filteredLanguages[0].displayCode === languageCode) {
      this.emitFilterChanged('language', languageCode);
    }
    return filteredLanguages;
  }

}

