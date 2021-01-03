import {Component, Input} from '@angular/core';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {FormBuilder} from '@angular/forms';
import {EventsEditTranslationComponent} from '../events-edit-translation/events-edit-translation.component';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';

@Component({
  selector: 'app-events-edit-translations',
  templateUrl: './events-edit-translations.component.html',
  styles: []
})
export class EventsEditTranslationsComponent extends FormListEditionComponent<EventsEditTranslationComponent, EventTranslationDto> {
  _languages: LanguageDto[];

  @Input() set languages(languages: LanguageDto[]) {
    this._languages = languages;
    if (languages.length > 0 && !this.elements.some(translation => translation.language?.id === this.defaultLanguage?.id)) {
      this.elements.push(new EventTranslationDto({language: this.defaultLanguage}));
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
