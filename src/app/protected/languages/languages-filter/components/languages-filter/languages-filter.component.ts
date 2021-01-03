import {Component, OnInit} from '@angular/core';
import {FilterComponent} from '../../../../../shared/components/bases/filter.component';
import {LanguagesFilter} from '../../../../../shared/filters/languages/languages.filter';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {LanguageDto} from '../../../../../shared/models/languages/language.dto';
import {Store} from '@ngrx/store';
import * as fromLanguagesFilter from '../../state/languages-filter.reducer';
import {debounceTime, map} from 'rxjs/operators';
import {Payload} from '../../../../../shared/redux/payload';
import * as SharedLanguagesSelectors from '../../../../../shared/states/languages/languages.selectors';
import * as LanguagesSelectors from '../../../state/languages.selectors';
import * as SharedLanguagesActions from '../../../../../shared/states/languages/languages.actions';
import * as LanguagesFilterActions from '../../state/languages-filter.actions';
import * as LanguagesFilterSelectors from '../../state/languages-filter.selectors';
import {StringUtils} from '../../../../../shared/utils/string.utils';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import * as _ from 'lodash';

@Component({
  selector: 'app-languages-filter',
  templateUrl: './languages-filter.component.html',
  styles: []
})
export class LanguagesFilterComponent extends FilterComponent<LanguagesFilter> implements OnInit {

  filterGrp: FormGroup;
  codeCtrl: FormControl;
  subCodeCtrl: FormControl;

  filteredCodes: Observable<string[]>;
  filteredSubCodes: Observable<string[]>;

  languages: LanguageDto[];
  confirmDisabled = true;

  constructor(private fb: FormBuilder, private store: Store<fromLanguagesFilter.State>) {
    super();
  }

  ngOnInit(): void {
    this.handleStore();
    this.initForm();
    this.handleFilterEdition();
  }


  private handleFilterEdition(): void {
    this.filterChanged.pipe(
      debounceTime(100)
    ).subscribe(filter => {
      this.store.dispatch(LanguagesFilterActions.updateFilter(new Payload<LanguagesFilter>(filter)));
    });
    this.filteredCodes = this.codeCtrl.valueChanges.pipe(
      debounceTime(200),
      map(languageCode => this.handleCodeValue(languageCode))
    );
    this.filteredSubCodes = this.subCodeCtrl.valueChanges.pipe(
      debounceTime(200),
      map(languageCode => this.filterSubCodeValue(languageCode ?? ''))
    );
  }


  private initForm(): void {
    this.codeCtrl = this.fb.control('');
    this.subCodeCtrl = this.fb.control('');
    this.subCodeCtrl.disable();
    this.filterGrp = this.fb.group({
      code: this.codeCtrl,
      subCode: this.subCodeCtrl,
    });
    this.filterGrp.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filterChanged.emit(
      new LanguagesFilter({code: this.codeCtrl.value, subCode: this.subCodeCtrl.value}))
    );
  }

  private handleStore(): void {
    this.store.select(SharedLanguagesSelectors.selectLanguages).subscribe(languages => {
      this.languages = languages;
    });
    this.store.dispatch(SharedLanguagesActions.loadLanguages());
    this.store.select(LanguagesFilterSelectors.selectFilter).subscribe(filter => {
      this.filter = filter;
    });
    this.store.select(LanguagesSelectors.selectIsDeleted).subscribe(isDeleted => {
      if (isDeleted) {
        this.store.dispatch(SharedLanguagesActions.loadLanguages());
      }
    });
  }

  private handleCodeValue(languageCode: string): string[] {
    const filteredLanguages = this.filterCodes(languageCode ?? '');
    if (filteredLanguages[0] !== languageCode) {
      this.subCodeCtrl.disable({emitEvent: false});
      this.confirmDisabled = true;
    } else {
      this.subCodeCtrl.enable({emitEvent: false});
      this.confirmDisabled = false;
    }
    return _.uniq(filteredLanguages);
  }

  private filterSubCodeValue(languageCode: string): string[] {
    return this.languages
      ?.filter(l => this.codeCtrl.value === l.code && (l.subCode == null || StringUtils.startWith(l.subCode.toLowerCase(), languageCode.toLowerCase())))
      ?.map(l => l.subCode) ?? [];
  }

  reset(): void {
    this.filterGrp.reset();
    this.filterReset.emit(true);
  }

  onFilterChanged<K extends keyof LanguagesFilter>(key: K, val: LanguagesFilter[K]): void {
    this.emitFilterChanged(key, val);
  }

  private filterCodes(languageCode: string): string[] {
    return this.languages?.filter(l => StringUtils.startWith(l.displayCode.toLowerCase(), languageCode.toLowerCase()))?.map(l => l.code) ?? [];
  }


  onCodeSelected($event: MatAutocompleteSelectedEvent): void {
    this.filter.code = $event.option.value;
  }

  confirm(): void {
    this.filterConfirmed.emit();
  }


}
