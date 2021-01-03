import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as LanguagesSelectors from '../../state/languages.selectors';
import * as fromLanguages from '../../state/languages.reducer';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LanguageDto} from '../../../../shared/models/languages/language.dto';
import {lengthValidator} from '../../../../shared/validators/string.validators';
import * as LanguagesActions from '../../state/languages.actions';
import {LanguageEditionDto} from '../../../../shared/models/languages/language-edition.dto';
import {Payload} from '../../../../shared/redux/payload';
import {startWith} from 'rxjs/operators';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {LanguageWithAvailableActionsDto} from '../../../../shared/models/languages/language-with-available-actions.dto';

@Component({
  selector: 'app-languages-create-page',
  templateUrl: './languages-create-page.component.html',
  styles: []
})
export class LanguagesCreatePageComponent implements OnInit {
  @ViewChild(MatHorizontalStepper)
  stepper: MatHorizontalStepper;

  codesGrp: FormGroup;
  codeCtrl: FormControl;
  subCodeCtrl: FormControl;
  private hasDuplicate: boolean;

  constructor(private fb: FormBuilder, private store: Store<fromLanguages.State>) {
    this.codeCtrl = this.fb.control('', {validators: [lengthValidator(2)]});
    this.subCodeCtrl = this.fb.control('', {validators: [lengthValidator(0, 2)]});
    this.codesGrp = this.fb.group({
      code: this.codeCtrl,
      subCode: this.subCodeCtrl
    });
  }


  ngOnInit(): void {

    this.store.select(LanguagesSelectors.selectCanCreate).subscribe(canCreate => {
      this.hasDuplicate = !canCreate;
      this.setDuplicateErrors();
    });
    this.codesGrp.valueChanges.pipe(startWith('')).subscribe(value => {
      this.store.dispatch(LanguagesActions.canCreate(
        new Payload<LanguageWithAvailableActionsDto>(new LanguageWithAvailableActionsDto({code: this.codeCtrl.value, subCode: this.subCodeCtrl.value})))
      );
      this.setDuplicateErrors();
    });
  }

  createLanguage(): void {
    this.store.dispatch(LanguagesActions.createLanguage(new Payload<LanguageEditionDto>(new LanguageEditionDto({code: this.codeCtrl.value, subCode: this.subCodeCtrl.value}))));
  }


  onChange(): void {
    this.setDuplicateErrors();
  }

  private setDuplicateErrors(): void {
    if (this.hasDuplicate) {
      this.subCodeCtrl.markAsDirty();
      this.subCodeCtrl.markAsTouched();
      this.subCodeCtrl.setErrors({duplicateLanguageErr: true});
    }
  }

  reset(): void {
    this.stepper.reset();
    this.subCodeCtrl.setValue('');
    this.codeCtrl.setValue('');
  }
}
