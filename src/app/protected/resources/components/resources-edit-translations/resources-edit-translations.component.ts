import {Component, Input, OnInit} from '@angular/core';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {ResourceTranslationDto} from '../../../../shared/models/resources/resource-translation.dto';
import {ResourcesEditTranslationComponent} from '../resources-edit-translation/resources-edit-translation.component';
import {FormBuilder} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ChoiceTranslationDto} from '../../../../shared/models/choices/choice-translation.dto';

@Component({
  selector: 'app-resources-edit-translations',
  templateUrl: './resources-edit-translations.component.html',
  styles: [
  ]
})
export class ResourcesEditTranslationsComponent extends FormListEditionComponent<ResourcesEditTranslationComponent, ResourceTranslationDto> implements OnInit {

  _languages: LanguageDto[];

  @Input() set languages(languages: LanguageDto[]) {
    this._languages = languages;
    if (languages.length > 0 && !this.elements.some(translation => translation.language.isDefault)) {
      this.elements.push(new ResourceTranslationDto({language: this.defaultLanguage}));
    }
  }

  get languages(): LanguageDto[] {
    return this._languages;
  }

  get defaultLanguage(): LanguageDto {
    return this._languages.find(l => l.isDefault);
  }

  get availableLanguages(): LanguageDto[] {
    return this._languages.filter(l => !this.elements.some(tN => tN.language?.id === l.id));
  }

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
  }

}
