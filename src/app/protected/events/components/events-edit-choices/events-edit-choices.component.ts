import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';

import {FormArray, FormBuilder} from '@angular/forms';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {notEmptyArr} from '../../../../shared/validators/array.validators';
import {ResourceTranslationDto} from '../../../../shared/models/resources/resource-translation.dto';
import {EventsEditChoiceComponent} from '../events-edit-choice/events-edit-choice.component';
import {DetailedChoice} from '../../../../shared/models/choices/detailed.choice';
import {FormListEditionComponent} from '../../../../shared/components/bases/form-list-edition.component';

@Component({
  selector: 'app-events-edit-choices',
  templateUrl: './events-edit-choices.component.html',
  styles: []
})
export class EventsEditChoicesComponent extends FormListEditionComponent<EventsEditChoiceComponent, DetailedChoice> {

  @Input() languages: LanguageDto[] = [];
  @Input() resources: ImageDetailedResourceDto[];

  constructor(protected fb: FormBuilder) {
    super(fb);
  }


}
