import {Component, Input, OnInit} from '@angular/core';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {FormBuilder} from '@angular/forms';
import {DifficultyTranslationDto} from '../../../../shared/models/difficulties/difficulty-translation.dto';
import {DifficultiesEditTranslationComponent} from '../difficulties-edit-translation/difficulties-edit-translation.component';

@Component({
  selector: 'app-difficulties-edit-translations',
  templateUrl: './difficulties-edit-translations.component.html',
  styles: [
  ]
})

export class DifficultiesEditTranslationsComponent extends FormListEditionComponent<DifficultiesEditTranslationComponent, DifficultyTranslationDto> {
  _languages: LanguageDto[];

  @Input() set languages(languages: LanguageDto[]) {
    this._languages = languages;
    if (languages.length > 0 && !this.elements.some(translation => translation.language?.id === this.defaultLanguage?.id)) {
      this.elements.push(new DifficultyTranslationDto({language: this.defaultLanguage}));
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

}
