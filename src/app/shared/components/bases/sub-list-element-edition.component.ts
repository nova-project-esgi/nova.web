import {FormGroup} from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubFormElementEditionComponent} from './sub-form-element-edition.component';

@Component({
  template: ''
})
export abstract class SubListElementEditionComponent<InputElement, OutputElement = InputElement> extends SubFormElementEditionComponent<InputElement, OutputElement> {


  @Input()
  canAdd: boolean;

  @Output() elementAdded = new EventEmitter<OutputElement>();
  @Output() elementDeleted = new EventEmitter<any>();

  resetState(): void {
    this.element = null;
  }

  onAddClicked(): void {
    this.elementAdded.emit(
      this.getElementInstance()
    );
    this._formGrp.reset();
    this.resetState();
  }

  onDeleteClicked(): void {
    this.elementDeleted.emit();
  }

  emitElementChanged(forValidForm = true): void {
    if ((forValidForm && !this.canAdd && this._formGrp.valid) || !forValidForm && !this.hasUpdate) {
      this.elementChanged.emit(
        this.getElementInstance()
      );
    }
  }
}



