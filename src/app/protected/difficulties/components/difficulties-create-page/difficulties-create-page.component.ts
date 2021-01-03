import {AfterViewChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {DetailedDifficultyEdition} from '../../../../shared/models/difficulties/detailed-difficulty-edition';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {Store} from '@ngrx/store';
import * as fromEvents from '../../../events/state/events.reducer';
import * as LanguagesSelectors from '../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../shared/states/languages/languages.actions';
import {Payload} from '../../../../shared/redux/payload';
import {DifficultyTranslationDto} from '../../../../shared/models/difficulties/difficulty-translation.dto';
import {DifficultyOption} from '../../../../shared/models/difficulties/difficulty-option';
import * as DifficultiesActions from '../../states/difficulties/difficulties.actions';

@Component({
  selector: 'app-difficulties-create-page',
  templateUrl: './difficulties-create-page.component.html',
  styles: []
})
export class DifficultiesCreatePageComponent implements AfterViewChecked {
  @ViewChild('stepper', {static: true})
  stepper: MatStepper;

  translationsArr: FormArray;
  choicesArr: FormArray;
  languages: LanguageDto[];
  resources: ImageDetailedResourceDto[];
  translations: DifficultyTranslationDto[] = [];
  optionsGrp: FormGroup;
  option: DifficultyOption;

  constructor(private store: Store<fromEvents.State>, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => this.languages = languages);
    this.store.dispatch(LanguagesActions.loadLanguages());
    this.translationsArr = this.fb.array([]);
    this.optionsGrp = this.fb.group({});
    this.option = new DifficultyOption({rank: 0, isDefault: false, canSetDefault: false});
  }


  onChange(): void {

  }


  createEvent(): void {
    const difficulty = new DetailedDifficultyEdition({
      translations: this.translations.map(t => t.toEdition()),
      isDefault: false,
      rank: this.option.rank
    });
    this.store.dispatch(DifficultiesActions.createDifficulty(new Payload<DetailedDifficultyEdition>(difficulty)));
  }

  resetStepper(): void {
    this.stepper.reset();
    this.option = new DifficultyOption({rank: 0, isDefault: false, canSetDefault: false});
    ;
    this.translations = [];
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onTranslationsChanged(translations: DifficultyTranslationDto[]): void {
    this.translations.splice(0, this.translations.length, ...translations);
  }


  onOptionsChanged($event: DifficultyOption): void {
    this.option = $event;
  }
}
