import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import * as fromResources from '../../state/resources.reducer';
import * as ResourcesActions from '../../state/resources.actions';
import * as ResourcesSelectors from '../../state/resources.selectors';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import {Store} from '@ngrx/store';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ImageDetailedResourceEditionDto} from '../../../../shared/models/resources/image-detailed-resource-edition.dto';
import {Payload} from '../../../../shared/redux/payload';
import {ResourceTranslationEditionDto} from '../../../../shared/models/resources/resource-translation-edition.dto';
import {ImageDropComponent} from '../../../../shared/components/image-drop/image-drop.component';
import {FormStatus} from '../../../../shared/types/form-status';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatStepper} from '@angular/material/stepper';
import {ResourceTranslationDto} from '../../../../shared/models/resources/resource-translation.dto';
import {notEmptyArr} from '../../../../shared/validators/array.validators';
import {ResourceDifficulty} from '../../../../shared/models/resources/resource-difficulty';
import {DetailedDifficultyDto} from '../../../../shared/models/difficulties/detailed-difficulty.dto';
import * as DifficultySelectors from '../../../../shared/states/difficulties/difficulties.selectors';
import * as DifficultiesActions from '../../../../shared/states/difficulties/difficulties.actions';

@Component({
  selector: 'app-resources-create-page',
  templateUrl: './resources-create-page.component.html',
  styles: []
})
export class ResourcesCreatePageComponent implements OnInit, AfterViewChecked {

  @ViewChild('stepper', {static: true})
  stepper: MatStepper;

  iconGrp: FormGroup;
  translationsArr: FormArray;
  languages: LanguageDto[];

  translations: ResourceTranslationDto[] = [];
  resourceDifficulties: ResourceDifficulty[] = [];
  iconPicture: File;
  difficultiesArray: FormArray;
  difficulties: DetailedDifficultyDto[];

  get availableLanguages(): LanguageDto[] {
    return this.languages.filter(l => !this.translations.some(tN => tN.language.id === l.id));
  }

  constructor(private fb: FormBuilder, private store: Store<fromResources.State>, private cdRef: ChangeDetectorRef) {
    this.iconGrp = this.fb.group({});
    this.translationsArr = this.fb.array([]);
    this.difficultiesArray = this.fb.array([]);
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
    this.store.select(DifficultySelectors.selectDifficulties).subscribe(difficulties => {
      this.difficulties = difficulties;
    });
    this.store.dispatch(LanguagesActions.loadLanguages());
    this.store.dispatch(DifficultiesActions.loadDifficulties());
  }


  ngOnInit(): void {
  }

  resetStepper(): void {
    this.translations = [];
    this.iconPicture = null;
    this.stepper.reset();
  }

  createResource(): void {
    this.store.dispatch(ResourcesActions.createResource(new Payload<ImageDetailedResourceEditionDto>(new ImageDetailedResourceEditionDto({
      translations: this.translations.map(tName => new ResourceTranslationEditionDto({
        name: tName.name, languageId: tName.language.id
      })),
      icon: this.iconPicture, difficulties: this.resourceDifficulties.map(d => d.toResourceDifficultyDto().toResourceDifficultyEditionDto())
    }))));
  }


  iconChanged(picture: File): void {
    this.iconPicture = picture;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onTranslationChanged(translations: ResourceTranslationDto[]): void {
    this.translations = translations;
  }

  onDifficultiesChanged(difficulties: ResourceDifficulty[]): void {
    this.resourceDifficulties = difficulties;
    // this._elementCopy.difficulties = difficulties.map(d => d.toResourceDifficultyDto());
  }
}


