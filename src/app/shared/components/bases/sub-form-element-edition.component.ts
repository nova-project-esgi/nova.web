import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  template: ''
})
export abstract class SubFormElementEditionComponent<InputElement, OutputElement = InputElement> {
  _formGrp: FormGroup;
  @Input()
  set formGrp(form: FormGroup) {
    this.initFormGrp(form);
  }
  get formGrp(): FormGroup{
    return this._formGrp;
  }

  @Output() elementChanged = new EventEmitter<OutputElement>();

  @Input()
  abstract element?: InputElement;

  _elementCopy: InputElement;

  hasUpdate: boolean;

  abstract initFormGrp(formGrp: FormGroup): void;

  protected abstract getElementInstance(): OutputElement;


  resetState(): void {
  }

  emitElementChanged(forValidForm = true): void {
    if ((forValidForm && this._formGrp.valid) || !forValidForm && !this.hasUpdate) {
      this.hasUpdate = false;
      this.elementChanged.emit(
        this.getElementInstance()
      );
    }
  }
}
