import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {debounceTime, map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {betweenValidator} from '../../../../shared/validators/string.validators';
import {ctrValidator} from '../../../../shared/validators/object.validators';
import {ResourceTranslationDto} from '../../../../shared/models/resources/resource-translation.dto';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';

@Component({
  selector: 'app-resources-edit-translation',
  templateUrl: './resources-edit-translation.component.html',
  styles: []
})
export class ResourcesEditTranslationComponent extends SubListElementEditionComponent<ResourceTranslationDto> implements OnInit {

  languageCtrl: FormControl;
  filteredLanguages: Observable<LanguageDto[]>;
  isDefaultTranslation: boolean;

  @Input()
  languages: LanguageDto[];

  @Input()
  set element(translation: ResourceTranslationDto) {
    this.languageCtrl.patchValue(translation?.language, {emitEvent: false});
    this.nameCtrl.patchValue(translation?.name, {emitEvent: false});
    this.isDefaultTranslation = translation?.language.isDefault;
    if (this.isDefaultTranslation) {
      this.languageCtrl.disable({emitEvent: false});
    } else {
      this.languageCtrl.enable({emitEvent: false});
    }
  }

  nameCtrl: FormControl;

  displayFn = (language: LanguageDto) => language?.displayCode;

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

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('language', this.languageCtrl);
    formGrp.setControl('name', this.nameCtrl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());
  }

  filterLanguages(inputValue: string | LanguageDto): LanguageDto[] {
    const value = inputValue instanceof LanguageDto ? inputValue.displayCode : inputValue;
    return this.languages.filter(l => _.startsWith(l?.displayCode?.toLowerCase(), value?.toLowerCase()));
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent): void {
    this.emitElementChanged();
  }

  ngOnInit(): void {
  }

  protected getElementInstance(): ResourceTranslationDto {
    return new ResourceTranslationDto({language: this.languageCtrl.value, name: this.nameCtrl.value});
  }


}
