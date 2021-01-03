import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventTranslationDto} from '../../../../../shared/models/events/event-translation.dto';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {LanguageDto} from '../../../../../shared/models/languages/language.dto';
import {Observable} from 'rxjs';
import * as fromEventsTranslations from '../../state/events-translation.reducer';
import * as LanguagesSelectors from '../../../../../shared/states/languages/languages.selectors';
import {Store} from '@ngrx/store';
import {EventTranslationCreationDto} from '../../../../../shared/models/events/event-translation-creation.dto';

@Component({
  selector: 'app-events-translation',
  templateUrl: './events-translation.component.html',
  styles: []
})
export class EventsTranslationComponent implements OnInit {
  private _translation: EventTranslationDto;
  private selectedLanguage: LanguageDto;

  @Input() set translation(translation: EventTranslationDto) {
    this._translation = new EventTranslationDto(translation);
    this.languageCtrl.setValue(this.filterLanguages(this._translation.language)[0]);
    this.titleCtrl.setValue(this._translation.title);
    this.descriptionCtrl.setValue(this._translation.description);
  }

  @Output() translationChanged = new EventEmitter<EventTranslationDto>();
  @Output() translationCreated = new EventEmitter<EventTranslationCreationDto>();

  get isCreation(): boolean {
    return !this._translation;
  }

  get canSave(): boolean {
    return this.descriptionCtrl.value !== this._translation.description
      || this.titleCtrl.value !== this._translation.title
      || this.languageCtrl.value !== this._translation.language;
  }

  titleCtrl: FormControl;
  descriptionCtrl: FormControl;
  languageCtrl: FormControl;
  translationGroup: FormGroup;
  filteredLanguages: Observable<LanguageDto[]>;
  languages: LanguageDto[];


  constructor(private fb: FormBuilder, private store: Store<fromEventsTranslations.State>) {
    store.select(LanguagesSelectors.selectAll).subscribe(languages => {
      this.languages = languages;
    });
    this.titleCtrl = this.fb.control(this._translation?.title);
    this.descriptionCtrl = this.fb.control(this._translation?.description);
    this.languageCtrl = this.fb.control(this._translation?.language);
    this.translationGroup = this.fb.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl
    });
  }

  ngOnInit(): void {
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterLanguages(value))
    );
  }

  private filterLanguages(value: string | LanguageDto): LanguageDto[] {
    if (typeof value === 'string') {
      return this.languages.filter(l => l.displayCode.toLowerCase().startsWith(value?.toLowerCase()));
    }
    this.selectedLanguage = value;
    return [value];
  }

  displayFn(language: LanguageDto): string {
    return language && language.displayCode ? language.displayCode : '';
  }

  createNew(): void {
    this.translationCreated.emit(new EventTranslationCreationDto({
      languageId: this.selectedLanguage.id,
      description: this.descriptionCtrl.value,
      title: this.titleCtrl.value
    }));
  }

  saveChanges(): void {
    this._translation.title = this.titleCtrl.value;
    this._translation.description = this.descriptionCtrl.value;
    this._translation.language = this.languageCtrl.value;
    // this._translation.languageId = this.selectedLanguage.id;
    this.translationChanged.emit(this._translation);
  }

}
