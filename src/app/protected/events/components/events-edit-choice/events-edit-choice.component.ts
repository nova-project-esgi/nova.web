import {AfterViewChecked, ChangeDetectorRef, Component, Input} from '@angular/core';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {DetailedChoice} from '../../../../shared/models/choices/detailed.choice';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {ChoiceTranslationDto} from '../../../../shared/models/choices/choice-translation.dto';
import {DetailedChoiceResource} from '../../../../shared/models/resources/detailed-choice-resource';

@Component({
  selector: 'app-events-edit-choice',
  templateUrl: './events-edit-choice.component.html',
  styles: []
})
export class EventsEditChoiceComponent extends SubListElementEditionComponent<DetailedChoice> implements AfterViewChecked {

  @Input() languages: LanguageDto[];
  @Input() imageResources: ImageDetailedResourceDto[];

  _choice: DetailedChoice = new DetailedChoice();

  @Input() set element(choice: DetailedChoice) {
    this._choice = choice ?? new DetailedChoice();
  }

  translationsArr: FormArray;
  resourcesArr: FormArray;


  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
    this.translationsArr = this.fb.array([]);
    this.resourcesArr = this.fb.array([]);
    this.initFormGrp(this.fb.group({}));
  }


  protected getElementInstance(): DetailedChoice {
    return this._choice;
  }

  resetState(): void {
    this._choice = new DetailedChoice();
  }

  onTranslationsChanged(translations: ChoiceTranslationDto[]): void {
    this._choice.translations = translations;
  }

  onResourcesChanged(resources: DetailedChoiceResource[]): void {
    this._choice.resources = resources;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('translations', this.translationsArr);
    formGrp.setControl('resources', this.resourcesArr);
    this._formGrp = formGrp;
  }
}
