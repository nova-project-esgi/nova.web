import {Component, Input, OnInit} from '@angular/core';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ctrValidator} from '../../../../shared/validators/object.validators';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {betweenValidator} from '../../../../shared/validators/string.validators';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ChoiceTranslationDto} from '../../../../shared/models/choices/choice-translation.dto';

@Component({
  selector: 'app-events-edit-choice-translation',
  templateUrl: './events-edit-choice-translation.component.html',
  styles: []
})
export class EventsEditChoiceTranslationComponent extends SubListElementEditionComponent<ChoiceTranslationDto> implements OnInit {
  isDefaultTranslation: boolean;

  @Input()
  set element(translation: ChoiceTranslationDto) {
    this.languageCtrl.setValue(translation?.language, {emitEvent: false});
    this.titleCtrl.setValue(translation?.title, {emitEvent: false});
    this.descriptionCtrl.setValue(translation?.description, {emitEvent: false});
    this.isDefaultTranslation = translation?.language.isDefault;
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

  protected getElementInstance(): ChoiceTranslationDto {
    return new ChoiceTranslationDto({language: this.languageCtrl.value, title: this.titleCtrl.value, description: this.descriptionCtrl.value});
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
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());
  }

}
