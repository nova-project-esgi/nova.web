import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {Observable} from 'rxjs';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {ctrValidator} from '../../../../shared/validators/object.validators';
import {betweenValidator} from '../../../../shared/validators/string.validators';
import {debounceTime, map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';

@Component({
  selector: 'app-events-edit-translation',
  templateUrl: './events-edit-translation.component.html',
  styles: []
})
export class EventsEditTranslationComponent extends SubListElementEditionComponent<EventTranslationDto> implements OnInit {
  isDefaultTranslation: boolean;

  @Input()
  set element(translation: EventTranslationDto) {
    this.languageCtrl.setValue(translation?.language, {emitEvent: false});
    this.titleCtrl.setValue(translation?.title, {emitEvent: false});
    this.descriptionCtrl.setValue(translation?.description, {emitEvent: false});
    this.isDefaultTranslation = translation?.language?.isDefault;
    if (this.isDefaultTranslation) {
      this.languageCtrl.disable({emitEvent: false});
    } else {
      this.languageCtrl.enable({emitEvent: false});
    }
  }

  constructor(fb: FormBuilder) {
    super();
    this.languageCtrl = fb.control('', [ctrValidator(LanguageDto.name)]);
    this.titleCtrl = fb.control('', {validators: [betweenValidator(3, 50)]});
    this.descriptionCtrl = fb.control('', {validators: [betweenValidator(3, 300)]});
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(inputValue =>
        this.filterLanguages(inputValue)
      )
    );
    this.initFormGrp(fb.group({}));
  }

  @Input()
  languages: LanguageDto[] = [];


  languageCtrl: FormControl;
  filteredLanguages: Observable<LanguageDto[]>;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;

  protected getElementInstance(): EventTranslationDto {
    return new EventTranslationDto({language: this.languageCtrl.value, title: this.titleCtrl.value, description: this.descriptionCtrl.value});
  }

  filterLanguages(inputValue: string | LanguageDto): LanguageDto[] {
    const value = inputValue instanceof LanguageDto ? inputValue.displayCode : inputValue;
    return this.languages.filter(l => _.startsWith(l?.displayCode?.toLowerCase(), value?.toLowerCase()));
  }

  displayFn = (language: LanguageDto) => language?.displayCode;


  ngOnInit(): void {
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent): void {
    this.emitElementChanged();
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('language', this.languageCtrl);
    formGrp.setControl('name', this.titleCtrl);
    formGrp.setControl('description', this.descriptionCtrl);
    this._formGrp = formGrp;

    this._formGrp.valueChanges.subscribe(val => {
        this.emitElementChanged();
    });
  }

}
