import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import * as fromResources from '../../state/resources.reducer';
import {Store} from '@ngrx/store';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ResourceTranslationDto} from '../../../../shared/models/resources/resource-translation.dto';
import * as _ from 'lodash';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DetailedDifficultyDto} from '../../../../shared/models/difficulties/detailed-difficulty.dto';
import {SubFormElementEditionComponent} from '../../../../shared/components/bases/sub-form-element-edition.component';
import {ResourceDifficultyDto} from '../../../../shared/models/resources/resource-difficulty.dto';
import {ResourceDifficulty} from '../../../../shared/models/resources/resource-difficulty';


@Component({
  selector: 'app-resources-resource',
  templateUrl: './resources-resource.component.html',
  styles: []
})
export class ResourcesResourceComponent extends SubFormElementEditionComponent<ImageDetailedResourceDto> implements OnInit, AfterViewChecked {

  @Output()
  resourceUpdated = new EventEmitter<ImageDetailedResourceDto>();

  @Output()
  resourceDeleted = new EventEmitter<ImageDetailedResourceDto>();

  @Input()
  languages: LanguageDto[];

  @Input()
  difficulties: DetailedDifficultyDto[];

  translationsArray: FormArray;
  iconUrl: string;
  difficultiesArray: FormArray;
  resourceDifficulties: ResourceDifficulty[] = [];

  get name(): string {
    return this.translations?.find(t => t.language.isDefault)?.name;
  }

  get translations(): ResourceTranslationDto[] {
    return this._elementCopy?.translations ?? [];
  }



  constructor(private store: Store<fromResources.State>, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    super();
    this.translationsArray = this.fb.array([]);
    this.difficultiesArray = this.fb.array([]);
    this.initFormGrp(this.fb.group({}));
  }

  @Input()
  set element(resource: ImageDetailedResourceDto) {
    this._elementCopy = _.clone(resource);
    this.resourceDifficulties = this._elementCopy.difficulties.map(d => d.toResourceDifficulty());
  }

  protected getElementInstance(): ImageDetailedResourceDto {
    return new ImageDetailedResourceDto({
      canDelete: this._elementCopy.canDelete,
      id: this._elementCopy.id,
      icon: this._elementCopy.icon,
      translations: this.translations,
      difficulties: this.resourceDifficulties.map(d => d.toResourceDifficultyDto())
    });
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('translations', this.translationsArray);
    formGrp.setControl('difficulties', this.difficultiesArray);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());
  }

  ngOnInit(): void {
  }

  get availableLanguages(): LanguageDto[] {
    return this.languages.filter(l => !this._elementCopy.translations.some(tN => tN.language.id === l.id));
  }

  update(): void {
    this.resourceUpdated.emit(this.getElementInstance());
  }

  delete(): void {
    this.resourceDeleted.emit(this.getElementInstance());
  }

  changeResourceIcon(icon: File): void {
    this._elementCopy.icon = icon;
  }


  onTranslationsChanged(translations: ResourceTranslationDto[]): void {
    this._elementCopy.translations = translations;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onIconLoaded(icon: string): void {
    this.iconUrl = icon;
  }


  onDifficultiesChanged(difficulties: ResourceDifficulty[]): void {
    this.resourceDifficulties = difficulties;
    // this._elementCopy.difficulties = difficulties.map(d => d.toResourceDifficultyDto());
  }
}
