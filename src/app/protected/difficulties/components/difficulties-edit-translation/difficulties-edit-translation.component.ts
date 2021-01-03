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
import {DifficultyTranslationDto} from '../../../../shared/models/difficulties/difficulty-translation.dto';

@Component({
  selector: 'app-difficulties-edit-translation',
  templateUrl: './difficulties-edit-translation.component.html',
  styles: [
  ]
})
export class DifficultiesEditTranslationComponent extends SubListElementEditionComponent<DifficultyTranslationDto> implements OnInit {
  isDefaultTranslation: boolean;

  @Input()
  set element(translation: DifficultyTranslationDto) {
    this.languageCtrl.setValue(translation?.language, {emitEvent: false});
    this.nameCtrl.setValue(translation?.name, {emitEvent: false});
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
    this.nameCtrl = fb.control('', {validators: [betweenValidator(3, 50)]});
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
  nameCtrl: FormControl;

  protected getElementInstance(): DifficultyTranslationDto {
    return new DifficultyTranslationDto({language: this.languageCtrl.value, name: this.nameCtrl.value});
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
    formGrp.setControl('name', this.nameCtrl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => {
      this.emitElementChanged();
    });
  }

}
