import {Component, Input, OnInit} from '@angular/core';
import {SubListElementEditionComponent} from '../../../../shared/components/bases/sub-list-element-edition.component';
import {EventOption} from '../../../../shared/models/events/event-option';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SubFormElementEditionComponent} from '../../../../shared/components/bases/sub-form-element-edition.component';

@Component({
  selector: 'app-events-edit-options',
  templateUrl: './events-edit-options.component.html',
  styles: []
})
export class EventsEditOptionsComponent extends SubFormElementEditionComponent<EventOption> implements OnInit {
  isActiveCtrl: FormControl;
  isDailyCtrl: FormControl;

  constructor(private fb: FormBuilder) {
    super();
    this.isActiveCtrl = this.fb.control(false);
    this.isDailyCtrl = this.fb.control(false);
    this.initFormGrp(this.fb.group({}));
  }

  ngOnInit(): void {
  }

  @Input()
  set element(option: EventOption) {
    this.isDailyCtrl.setValue(option?.isDaily);
    this.isActiveCtrl.setValue(option?.isActive);
  }

  protected getElementInstance(): EventOption {
    return new EventOption({isActive: this.isActiveCtrl.value, isDaily: this.isDailyCtrl.value});
  }

  initFormGrp(formGrp: FormGroup): void {
    formGrp.setControl('isDaily', this.isDailyCtrl);
    formGrp.setControl('isActive', this.isActiveCtrl);
    this._formGrp = formGrp;
    this._formGrp.valueChanges.subscribe(val => {
      this.emitElementChanged();
    });
  }
}
