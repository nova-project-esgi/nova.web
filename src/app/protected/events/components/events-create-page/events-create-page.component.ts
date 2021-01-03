import {AfterViewChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromEvents from '../../state/events.reducer';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import * as ResourcesSelectors from '../../../../shared/states/resources/resources.selectors';
import * as ResourcesActions from '../../../../shared/states/resources/resources.actions';
import * as EventsActions from '../../state/events.actions';
import * as EventsSelectors from '../../state/events.selectors';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {DetailedChoice} from '../../../../shared/models/choices/detailed.choice';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {Payload} from '../../../../shared/redux/payload';
import {EventOption} from '../../../../shared/models/events/event-option';
import {ImageDetailedEventEdition} from '../../../../shared/models/events/image-detailed-event-edition';

@Component({
  selector: 'app-events-create-page',
  templateUrl: './events-create-page.component.html',
  styles: []
})
export class EventsCreatePageComponent implements AfterViewChecked {

  @ViewChild('stepper', {static: true})
  stepper: MatStepper;

  translationsArr: FormArray;
  choicesArr: FormArray;
  pictureGrp: FormGroup;
  eventPicture: File;
  languages: LanguageDto[];
  resources: ImageDetailedResourceDto[];
  choices: DetailedChoice[] = [];
  translations: EventTranslationDto[] = [];
  optionsGrp: FormGroup;
  eventOption: EventOption;
  isEventCreated: boolean;


  constructor(private store: Store<fromEvents.State>, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => this.languages = languages);
    this.store.dispatch(LanguagesActions.loadLanguages());
    this.store.select(ResourcesSelectors.selectResources).subscribe(resources => this.resources = resources);
    this.store.dispatch(ResourcesActions.loadResources());
    this.store.select(EventsSelectors.isEventCreated).subscribe(isCreated => this.isEventCreated = isCreated);
    this.translationsArr = this.fb.array([]);
    this.choicesArr = this.fb.array([]);
    this.pictureGrp = this.fb.group({});
    this.optionsGrp = this.fb.group({});
  }


  onChange(): void {

  }

  pictureChanged(picture: File): void {
    this.eventPicture = picture;
  }

  createEvent(): void {
    const event = new ImageDetailedEventEdition({
      choices: this.choices.map(c => c.toEdition()),
      translations: this.translations.map(t => t.toEditionDto()),
      isActive: this.eventOption.isDaily,
      isDaily: this.eventOption.isActive,
      image: this.eventPicture
    });
    this.store.dispatch(EventsActions.createEvent(new Payload<ImageDetailedEventEdition>(event)));
  }

  resetStepper(): void {
    this.stepper.reset();
    this.choices = [];
    this.eventOption = null;
    this.eventPicture = null;
    this.translations = [];
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onChoicesChange(choices: DetailedChoice[]): void {
    this.choices = choices;
  }

  onTranslationsChanged(translations: EventTranslationDto[]): void {
    // this.translations = translations;
    this.translations.splice(0, this.translations.length, ...translations);
  }

  onOptionsChanged(option: EventOption): void {
    this.eventOption = option;
  }
}
