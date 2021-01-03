import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {ctrValidator} from '../../../../shared/validators/object.validators';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {ResourceDifficulty} from '../../../../shared/models/resources/resource-difficulty';
import {DetailedDifficultyTranslation} from '../../../../shared/models/difficulties/detailed-difficulty-translation';
import {DetailedDifficultyDto} from '../../../../shared/models/difficulties/detailed-difficulty.dto';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-resources-edit-difficulty',
  templateUrl: './resources-edit-difficulty.component.html',
  styles: []
})
export class ResourcesEditDifficultyComponent extends SubListElementEditionComponent<ResourceDifficulty> implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.startValueCtrl = this.fb.control(0, [Validators.min(0)]);
    this.difficultiesCtrl = this.fb.control('', [Validators.required, ctrValidator(DetailedDifficultyTranslation.name)]);
    this.languagesCtrl = this.fb.control(0, [Validators.required, ctrValidator(LanguageDto.name)]);
    this.languagesFiltered = this.languagesCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filterLanguages(val))
    );
    this.difficultiesFiltered = this.difficultiesCtrl.valueChanges.pipe(
      map(val => {
        return this.filterDifficulty(val);
      })
    );
    this.initFormGrp(this.fb.group({}));
  }

  @Input()
  set element(resourceDifficulty: ResourceDifficulty) {
    const difficultyTranslation = resourceDifficulty?.difficulty?.translations?.length > 0 ? resourceDifficulty?.difficulty?.translations[resourceDifficulty.selectedDifficultyTranslationIdx] : null;
    const detailedTranslation = new DetailedDifficultyTranslation({language: difficultyTranslation?.language, name: difficultyTranslation?.name, difficulty: resourceDifficulty?.difficulty});
    this._elementCopy = _.clone(resourceDifficulty);
    if (resourceDifficulty?.difficulty?.isDefault) {
      this.difficultiesCtrl.disable({emitEvent: false});
    } else {
      this.difficultiesCtrl.enable({emitEvent: false});
    }
    this.difficultiesCtrl.setValue(detailedTranslation, {emitEvent: false});
    this.languagesCtrl.setValue(difficultyTranslation?.language, {emitEvent: false});
    this.startValueCtrl.setValue(resourceDifficulty?.startValue ?? 0, {emitEvent: false});

  }

  @Input()
  set difficulties(difficulties: DetailedDifficultyDto[]) {
    this.difficultiesTranslations = _.flatMap(
      difficulties.map(
        d => d.translations.map(t => new DetailedDifficultyTranslation({language: t.language, name: t.name, difficulty: d}))
      )
    );
  }


  get availableLanguages(): LanguageDto[] {
    if (this._elementCopy?.difficulty?.isDefault) {
      return this._elementCopy.difficulty.translations.map(t => t.language);
    }
    const languages = this.difficultiesTranslations?.map(tR => tR.language) ?? [];
    return _.uniqBy(languages, l => l.id);
  }

  get difficultyTranslationsByLanguages(): DetailedDifficultyTranslation[] {
    return this.difficultiesTranslations?.filter(r => this.filterLanguages(this.languagesCtrl.value).some(l => l.id === r.language.id)) ?? [];
  }

  languagesFiltered: Observable<LanguageDto[]>;
  difficultiesTranslations: DetailedDifficultyTranslation[];
  difficultiesFiltered: Observable<DetailedDifficultyTranslation[]>;

  startValueCtrl: FormControl;
  difficultiesCtrl: FormControl;
  languagesCtrl: FormControl;

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('difficulty', this.difficultiesCtrl);
    formGrp.setControl('language', this.languagesCtrl);
    formGrp.setControl('startValue', this.startValueCtrl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());
  }

  difficultyDisplayFn = (difficulty: DetailedDifficultyTranslation) => difficulty?.name;
  languageDisplayFn = (language: LanguageDto) => language?.displayCode;

  protected getElementInstance(): ResourceDifficulty {
    const difficultyTranslation = this.difficultiesCtrl.value as DetailedDifficultyTranslation;
    return new ResourceDifficulty({
      difficulty: difficultyTranslation?.difficulty,
      startValue: this.startValueCtrl.value,
      selectedDifficultyTranslationIdx: difficultyTranslation?.difficulty?.translations?.findIndex(t => t.language.id === this.languagesCtrl.value.id)
    });
  }

  ngOnInit(): void {
  }

  private filterLanguages(val: string | LanguageDto): LanguageDto[] {
    const textVal = val instanceof LanguageDto ? val.displayCode : val;
    return this.availableLanguages.filter(l => _.startsWith(l.displayCode.toLowerCase(), textVal?.toLowerCase()));
  }

  private filterDifficulty(val: string | DetailedDifficultyTranslation): DetailedDifficultyTranslation[] {
    const textVal = val instanceof DetailedDifficultyTranslation ? val.name : val;
    return this.difficultyTranslationsByLanguages.filter(r => _.startsWith(r.name.toLowerCase(), textVal?.toLowerCase()));
  }


  onLanguageSelected(selectedEvent: MatAutocompleteSelectedEvent): void {
    const language = selectedEvent.option.value as LanguageDto;
    const difficultyTranslation = this.difficultiesCtrl.value as DetailedDifficultyTranslation
    if (difficultyTranslation) {
      const translation = difficultyTranslation.difficulty.translations.find(t => t.language.id === language.id);
      this.difficultiesCtrl.setValue(new DetailedDifficultyTranslation({
        difficulty: difficultyTranslation.difficulty,
        language,
        name: translation.name
      }));
    }
  }
}
