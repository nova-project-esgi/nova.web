import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {LanguageDto} from '../../../../../shared/models/languages/language.dto';
import {Observable} from 'rxjs';
import {ResourceNameTranslationDto} from '../../../../../shared/models/resources/resource-name-translation.dto';

import * as fromResourcesFilter from '../../state/resources-filter.reducer';
import * as LanguagesSelectors from '../../../../../shared/states/languages/languages.selectors';
import * as LanguagesActions from '../../../../../shared/states/languages/languages.actions';
import * as ResourceFilterSelectors from '../../state/resources-filter.selectors';
import * as ResourceFilterActions from '../../state/resources-filter.actions';

import {Store} from '@ngrx/store';
import {FilterComponent} from '../../../../../shared/components/bases/filter.component';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';
import {ResourcesFilter} from '../../../../../shared/filters/resources/resources-filter';
import {Payload} from '../../../../../shared/redux/payload';


@Component({
  selector: 'app-resources-filter',
  templateUrl: './resources-filter.component.html',
  styles: []
})
export class ResourcesFilterComponent extends FilterComponent<ResourcesFilter> implements OnInit {

  constructor(private store: Store<fromResourcesFilter.State>, private fb: FormBuilder) {
    super();
    this.initStore();
    this.initForm();
    this.initFormListeners();
  }

  private languages: LanguageDto[];
  private names: ResourceNameTranslationDto[];

  languageCtrl: FormControl;
  filteredLanguages: Observable<LanguageDto[]>;
  nameCtrl: FormControl;
  confirmDisabled: boolean;
  filteredNames: Observable<ResourceNameTranslationDto[]>;

  private initFormListeners(): void {
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.handleLanguageValue(value))
    );

    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.handleResourceNameValue(value))
    );
    this.filterGrp.valueChanges.subscribe((value: ResourcesFilter) => {
      if (_.isEqual(value, this.filter)) {
        return;
      }
      this.filterChanged.emit(value);
      this.store.dispatch(ResourceFilterActions.updateFilter(new Payload<ResourcesFilter>(value)));
    });
  }

  private initForm(): void {
    this.languageCtrl = this.fb.control('');
    this.nameCtrl = this.fb.control('');
    this.filterGrp = this.fb.group({
      language: this.languageCtrl,
      name: this.nameCtrl
    });
  }

  private initStore(): void {
    this.store.select(LanguagesSelectors.selectLanguages).subscribe(languages => this.languages = languages);
    this.store.select(ResourceFilterSelectors.selectNames).subscribe(names => this.names = names);
    this.store.select(ResourceFilterSelectors.selectFilter).subscribe(filter => {
      if (filter.language && filter.name && !_.isEqual(this.filter, filter)) {
        this.store.dispatch(ResourceFilterActions.loadNames());
      }
      this.filter = filter;
    });
    this.store.dispatch(LanguagesActions.loadLanguages());
  }

  private filterLanguages(value: string): LanguageDto[] {
    return this.languages?.filter(l => _.startsWith(l.displayCode.toLowerCase(), value?.toLowerCase()));
  }

  private handleLanguageValue(value: string): LanguageDto[] {
    const filteredLanguages = this.filterLanguages(value);
    if (filteredLanguages.length === 0) {
      this.nameCtrl.disable({emitEvent: false});
    } else {
      this.nameCtrl.enable({emitEvent: false});
    }
    return filteredLanguages;
  }

  private handleResourceNameValue(value: string): ResourceNameTranslationDto[] {
    return this.names.filter(name => _.startsWith(name.name.toLowerCase(), value?.toLowerCase()));
  }

  ngOnInit(): void {
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent): void {

  }

  confirm(): void {
    this.filterConfirmed.emit();
  }

  reset(): void {
    this.filterGrp.reset();
  }

}
