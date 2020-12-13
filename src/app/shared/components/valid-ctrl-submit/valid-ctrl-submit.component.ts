import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-valid-ctrl-submit',
  templateUrl: './valid-ctrl-submit.component.html'
})
export class ValidCtrlSubmitComponent implements OnInit {

  @Input()
  abstractControl: AbstractControl;

  @Output()
  canceled = new EventEmitter<AbstractControl>();

  @Output()
  validated = new EventEmitter<AbstractControl>();

  @Output()
  edited = new EventEmitter<AbstractControl>();

  constructor() { }

  ngOnInit(): void {

  }

  get canValidate(): boolean{
    return this.abstractControl.dirty && this.abstractControl.valid && !this.abstractControl.disabled;
  }

  get canCancel(): boolean{
    return !this.abstractControl.disabled;
  }

  get canEdit(): boolean{
    return this.abstractControl.disabled;
  }

  onValidate(): void {
    this.abstractControl.disable();
    this.validated.emit(this.abstractControl);
  }

  onCancel(): void {
    this.abstractControl.disable();
    this.canceled.emit(this.abstractControl);
  }

  onEdit(): void {
    this.abstractControl.enable();
    this.edited.emit(this.abstractControl);
  }
}
