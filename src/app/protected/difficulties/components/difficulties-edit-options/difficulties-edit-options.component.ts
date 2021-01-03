import {Component, Input, OnInit} from '@angular/core';
import {SubFormElementEditionComponent} from '../../../../shared/components/bases/sub-form-element-edition.component';
import {DifficultyOption} from '../../../../shared/models/difficulties/difficulty-option';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-difficulties-edit-options',
  templateUrl: './difficulties-edit-options.component.html',
  styles: []
})
export class DifficultiesEditOptionsComponent extends SubFormElementEditionComponent<DifficultyOption> implements OnInit {

  isDefaultControl: FormControl;
  rankControl: FormControl;


  constructor(private fb: FormBuilder) {
    super();
    this.isDefaultControl = this.fb.control(false);
    this.rankControl = this.fb.control(0, {validators: [Validators.min(0)]});
    this.initFormGrp(this.fb.group({}));

  }

  ngOnInit(): void {
  }

  @Input()
  set element(opt: DifficultyOption) {
    this._elementCopy = _.clone(opt);
    this.isDefaultControl.setValue(opt.isDefault, {emitEvent: false});
    this.rankControl.setValue(opt.rank, {emitEvent: false});
    if (opt.canSetDefault) {
      this.isDefaultControl.enable({emitEvent: false});
    } else {
      this.isDefaultControl.disable({emitEvent: false});
    }
  }

  protected getElementInstance(): DifficultyOption {
    return new DifficultyOption({rank: this.rankControl.value, isDefault: this.isDefaultControl.value, canSetDefault: this._elementCopy.canSetDefault});
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('isDefault', this.isDefaultControl);
    formGrp.setControl('rank', this.rankControl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => this.emitElementChanged());
  }

}
