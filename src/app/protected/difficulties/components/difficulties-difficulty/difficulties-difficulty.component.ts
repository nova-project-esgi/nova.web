import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {EventTranslationDto} from '../../../../shared/models/events/event-translation.dto';
import {DetailedChoice} from '../../../../shared/models/choices/detailed.choice';
import {EventOption} from '../../../../shared/models/events/event-option';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {DetailedDifficultyWithAvailableActionsDto} from '../../../../shared/models/difficulties/detailed-difficulty-with-available-actions.dto';
import {DetailedDifficultyEdition} from '../../../../shared/models/difficulties/detailed-difficulty-edition';
import {DifficultyOption} from '../../../../shared/models/difficulties/difficulty-option';
import {DifficultyTranslationDto} from '../../../../shared/models/difficulties/difficulty-translation.dto';
import * as _ from 'lodash';

@Component({
  selector: 'app-difficulties-difficulty',
  templateUrl: './difficulties-difficulty.component.html',
  styles: []
})

export class DifficultiesDifficultyComponent extends SubListElementEditionComponent<DetailedDifficultyWithAvailableActionsDto, DetailedDifficultyEdition> implements OnInit, AfterViewChecked {

  translationsArr: FormArray;
  optionsGrp: FormGroup;
  translations: DifficultyTranslationDto[] = [];
  options: DifficultyOption;

  @Input()
  languages: LanguageDto[];

  eventId: string;

  @Input()
  set element(difficulty: DetailedDifficultyWithAvailableActionsDto) {
    this._elementCopy = _.clone(difficulty);
    this.eventId = difficulty.id;
    this.translations = difficulty.translations;
    this.options = new DifficultyOption({isDefault: difficulty.isDefault, rank: difficulty.rank, canSetDefault: difficulty.canSetDefault});
  }

  @Output()
  difficultyUpdated = new EventEmitter<DetailedDifficultyEdition>();

  @Output()
  difficultyDeleted = new EventEmitter();

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
    this.optionsGrp = this.fb.group({});
    this.translationsArr = this.fb.array([]);
    this.initFormGrp(this.fb.group({}));
  }

  get name(): string {
    return this.translations?.find(t => t.language?.isDefault)?.name;
  }

  ngOnInit(): void {
  }

  protected getElementInstance(): DetailedDifficultyEdition {
    return new DetailedDifficultyEdition({
      id: this._elementCopy.id,
      translations: this.translations.map(t => t.toEdition()),
      isDefault: this.options.isDefault,
      rank: this.options.rank,
    });
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('translations', this.translationsArr);
    formGrp.setControl('options', this.optionsGrp);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());

  }


  onTranslationsChanged(translations: DifficultyTranslationDto[]): void {
    this.translations = translations;
  }

  onOptionsChanged(option: DifficultyOption): void {
    this.options = option;
  }

  update(): void {
    this.difficultyUpdated.emit(this.getElementInstance());
  }

  delete(): void {
    this.difficultyDeleted.emit(this.eventId);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

}
