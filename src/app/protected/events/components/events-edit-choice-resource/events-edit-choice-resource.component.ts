import {Component, Input, OnInit} from '@angular/core';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {ImageDetailedResourceDto} from '../../../../shared/models/resources/image-detailed-resource.dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import * as _ from 'lodash';
import {map, startWith} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {DetailedResourceTranslation} from '../../../../shared/models/resources/detailed-resource-translation';
import {ctrValidator} from '../../../../shared/validators/object.validators';
import {FileUtils} from '../../../../shared/utils/file.utils';
import {DetailedChoiceResource} from '../../../../shared/models/resources/detailed-choice-resource';
import {neValidator} from '../../../../shared/validators/value.validators';

@Component({
  selector: 'app-events-edit-choice-resource',
  templateUrl: './events-edit-choice-resource.component.html',
  styles: []
})
export class EventsEditChoiceResourceComponent extends SubListElementEditionComponent<DetailedChoiceResource> implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.changeValueCtrl = this.fb.control(0, [neValidator(0)]);
    this.resourcesCtrl = this.fb.control('', [Validators.required, ctrValidator(DetailedResourceTranslation.name)]);
    this.languagesCtrl = this.fb.control(0, [Validators.required, ctrValidator(LanguageDto.name)]);
    this.languagesFiltered = this.languagesCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filterLanguages(val))
    );
    this.resourcesFiltered = this.resourcesCtrl.valueChanges.pipe(
      map(val => {
        this.setResourceIcon(val);
        return this.filterResources(val);
      })
    );
    this.initFormGrp(this.fb.group({}));
  }

  @Input()
  set element(choiceResource: DetailedChoiceResource) {
    const resourceTranslation = choiceResource?.resource?.translations?.length > 0 ? choiceResource.resource.translations[choiceResource.resourceTranslationIdx] : null;
    const detailedResourceTranslation = new DetailedResourceTranslation({language: resourceTranslation?.language, name: resourceTranslation?.name, resource: choiceResource?.resource});
    this.resourcesCtrl.setValue(detailedResourceTranslation, {emitEvent: false});
    this.languagesCtrl.setValue(resourceTranslation?.language, {emitEvent: false});
    this.changeValueCtrl.setValue(choiceResource?.changeValue ?? 0, {emitEvent: false});
    this.setResourceIcon(detailedResourceTranslation);
  }

  @Input()
  set resources(resources: ImageDetailedResourceDto[]) {
    this.translationResources = _.flatMap(
      resources.map(
        r => r.translations.map(t => new DetailedResourceTranslation({language: t.language, name: t.name, resource: r}))
      )
    );
  }


  get availableLanguages(): LanguageDto[] {
    const languages = this.translationResources?.map(tR => tR.language) ?? [];
    return _.uniqBy(languages, l => l.id);
  }

  get translationsResourcesByLanguages(): DetailedResourceTranslation[] {
    return this.translationResources?.filter(r => this.filterLanguages(this.languagesCtrl.value).some(l => l.id === r.language.id)) ?? [];
  }
  languagesFiltered: Observable<LanguageDto[]>;
  translationResources: DetailedResourceTranslation[];
  resourcesFiltered: Observable<DetailedResourceTranslation[]>;

  changeValueCtrl: FormControl;
  resourcesCtrl: FormControl;
  languagesCtrl: FormControl;
  resourceIcon = new BehaviorSubject<string>(null);
  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('resource', this.resourcesCtrl);
    formGrp.setControl('language', this.languagesCtrl);
    formGrp.setControl('changeValue', this.changeValueCtrl);
    this._formGrp = formGrp;
  }
  resourceDisplayFn = (resource: DetailedResourceTranslation) => resource?.name;
  languageDisplayFn = (language: LanguageDto) => language?.displayCode;

  protected getElementInstance(): DetailedChoiceResource {
    const detailedResourceTranslation = this.resourcesCtrl.value as DetailedResourceTranslation;
    return new DetailedChoiceResource({
      resource: detailedResourceTranslation?.resource,
      changeValue: this.changeValueCtrl.value,
      resourceTranslationIdx: detailedResourceTranslation?.resource?.translations?.findIndex(t => t.language.id === this.languagesCtrl.value.id)
    });
  }

  ngOnInit(): void {
  }

  private setResourceIcon(resourceTranslation: DetailedResourceTranslation | string): void {
    if (resourceTranslation instanceof DetailedResourceTranslation && resourceTranslation?.resource?.icon) {
      FileUtils.fileToString(resourceTranslation.resource.icon).subscribe(icon => this.resourceIcon.next(icon));
    } else {
      this.resourceIcon.next('');
    }
  }

  private filterLanguages(val: string | LanguageDto): LanguageDto[] {
    const textVal = val instanceof LanguageDto ? val.displayCode : val;
    return this.availableLanguages.filter(l => _.startsWith(l.displayCode.toLowerCase(), textVal?.toLowerCase()));
  }

  private filterResources(val: string | DetailedResourceTranslation): DetailedResourceTranslation[] {
    const textVal = val instanceof DetailedResourceTranslation ? val.name : val;
    return this.translationsResourcesByLanguages.filter(r => _.startsWith(r.name.toLowerCase(), textVal?.toLowerCase()));
  }
}
