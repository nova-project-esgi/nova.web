import {Component, Input, OnInit} from '@angular/core';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';
import {ChoiceTranslationDto} from '../../../../shared/models/choices/choice-translation.dto';
import {EventsEditChoiceTranslationComponent} from '../events-edit-choice-translation/events-edit-choice-translation.component';
import {FormBuilder} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';

@Component({
  selector: 'app-events-edit-choice-translations',
  templateUrl: './events-edit-choice-translations.component.html',
  styles: []
})
export class EventsEditChoiceTranslationsComponent extends FormListEditionComponent<EventsEditChoiceTranslationComponent, ChoiceTranslationDto> implements OnInit {


  _languages: LanguageDto[];

  @Input() set languages(languages: LanguageDto[]) {
    this._languages = languages;
    if (languages.length > 0 && !this.elements.some(translation => translation.language?.id === this.defaultLanguage?.id)) {
      this.elements.push(new ChoiceTranslationDto({language: this.defaultLanguage}));
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
