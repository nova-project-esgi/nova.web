import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromLanguages from '../../state/languages.reducer';
import * as LanguagesActions from '../../state/languages.actions';
import {Payload} from '../../../../shared/redux/payload';
import {LanguageWithAvailableActionsDto} from '../../../../shared/models/languages/language-with-available-actions.dto';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';

@Component({
  selector: 'app-languages-language',
  templateUrl: './languages-language.component.html',
  styles: []
})
export class LanguagesLanguageComponent extends SubListElementEditionComponent<LanguageWithAvailableActionsDto> implements OnInit {
  _elementCopy: LanguageWithAvailableActionsDto;
  codeCtrl: FormControl;
  subCodeCtrl: FormControl;
  isDefaultCtrl: FormControl;

  @Output()
  languageUpdated = new EventEmitter<LanguageWithAvailableActionsDto>();

  @Output()
  languageDeleted = new EventEmitter<string>();


  @Input()
  set element(language: LanguageWithAvailableActionsDto) {
    this._elementCopy = new LanguageWithAvailableActionsDto(language);
    this.codeCtrl.setValue(this._elementCopy.code, {emitEvent: false});
    this.subCodeCtrl.setValue(this._elementCopy.subCode, {emitEvent: false});
    this.isDefaultCtrl.setValue(this._elementCopy.isDefault, {emitEvent: false});
    if (!this._elementCopy.canUpdate) {
      this._formGrp.setErrors({duplicateError: true});
    } else {
      this._formGrp.setErrors(null, {emitEvent: false});
    }
    // if (this._formGrp.pristine) {

    // }
  }


  constructor(private fb: FormBuilder, private store: Store<fromLanguages.State>) {
    super();
    this.codeCtrl = fb.control('');
    this.subCodeCtrl = fb.control('');
    this.isDefaultCtrl = fb.control(false);
    this.initFormGrp(this.fb.group({}));

  }

  ngOnInit(): void {
  }

  updateLanguage(): void {
    this.languageUpdated.emit(this.getElementInstance());
  }

  deleteLanguage(): void {
    this.languageDeleted.emit(this._elementCopy.id);
  }

  protected getElementInstance(): LanguageWithAvailableActionsDto {
    return new LanguageWithAvailableActionsDto({
      id: this._elementCopy.id,
      code: this.codeCtrl.value,
      subCode: this.subCodeCtrl.value,
      isDefault: this.isDefaultCtrl.value,
      canDelete: this._elementCopy.canDelete,
      canUpdate: this._elementCopy.canUpdate,
      canSetDefault: this._elementCopy.canSetDefault
    });
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('code', this.codeCtrl);
    formGrp.setControl('subCode', this.subCodeCtrl);
    formGrp.setControl('isDefault', this.isDefaultCtrl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => {
      if (this._formGrp.valid) {
        this.emitElementChanged();
        this.store.dispatch(
          LanguagesActions.canUpdate(new Payload<LanguageWithAvailableActionsDto>(this.getElementInstance()))
        );
      }

    });
  }
}
