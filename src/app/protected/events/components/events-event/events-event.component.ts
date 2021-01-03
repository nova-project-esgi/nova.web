import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ImageDetailedEventDto} from '../../../../shared/models/events/image-detailed-event.dto';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {EventOption} from '../../../../shared/models/events/event-option';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {DetailedChoice} from '../../../../shared/models/choices/detailed.choice';
import {ImageDetailedEventEdition} from '../../../../shared/models/events/image-detailed-event-edition';
import * as _ from 'lodash';


@Component({
  selector: 'app-events-event',
  templateUrl: './events-event.component.html',
  styles: []
})
export class EventsEventComponent extends SubListElementEditionComponent<ImageDetailedEventDto, ImageDetailedEventEdition> implements OnInit, AfterViewChecked {

  titleCtrl: FormControl;

  translationsArr: FormArray;
  choicesArr: FormArray;
  optionsGrp: FormGroup;
  translations: EventTranslationDto[] = [];
  choices: DetailedChoice[] = [];
  options: EventOption;


  @Input()
  languages: LanguageDto[];



  @Input()
  resources: ImageDetailedResourceDto[];
  background: File;
  eventId: string;
  urlBackground: string;

  @Input()
  set element(event: ImageDetailedEventDto) {
    this.eventId = event.id;
    this.choices = event.choices.map(c => c.toDetailedChoice());
    this.translations = event.translations;
    this.options = new EventOption({isActive: event.isActive, isDaily: event.isDaily});
    this.background = event.background;
  }

  @Output()
  eventUpdated = new EventEmitter<ImageDetailedEventEdition>();

  @Output()
  eventDeleted = new EventEmitter();

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
    this.optionsGrp = this.fb.group({});
    this.translationsArr = this.fb.array([]);
    this.choicesArr = this.fb.array([]);
    this.initFormGrp(this.fb.group({}));
  }

  get title(): string{
    return this.translations?.find(t => t.language?.isDefault)?.title;
  }

  ngOnInit(): void {
    // this.titleCtrl = this.fb.control(this._event?.title);
    // this.descriptionCtrl = this.fb.control(this._event?.description);
  }


  loadChoices(): void {

  }


  protected getElementInstance(): ImageDetailedEventEdition {
    return new ImageDetailedEventEdition({
      id: this.eventId,
      choices: this.choices.map(c => c.toEdition()),
      translations: this.translations.map(t => t.toEditionDto()),
      isActive: this.options.isActive,
      isDaily: this.options.isDaily,
      image: this.background
    });
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('translations', this.translationsArr);
    formGrp.setControl('options', this.optionsGrp);
    formGrp.setControl('choices', this.choicesArr);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());

  }

  onChoicesChange(choices: DetailedChoice[]): void {
    this.choices = choices;
  }

  onBackgroundChanged(picture: File): void {
    this.background = picture;
  }

  onTranslationsChanged(translations: EventTranslationDto[]): void {
    this.translations = translations;
  }

  onOptionsChanged(option: EventOption): void {
    this.options = option;
  }

  update(): void {
    this.eventUpdated.emit(this.getElementInstance());
  }

  delete(): void {
    this.eventDeleted.emit(this.eventId);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }


  onPictureLoaded(picture: string): void {
    this.urlBackground = picture;
  }
}
