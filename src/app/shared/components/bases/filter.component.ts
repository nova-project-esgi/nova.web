import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  template: ''
})
export abstract class FilterComponent<T> {

  filterGrp: FormGroup;

  filterCopy: T;

  @Input()
  set filter(filter: T) {
    this.filterCopy = _.clone(filter);
  }


  @Output()
  filterChanged = new EventEmitter<T>();

  @Output()
  filterReset = new EventEmitter<boolean>();

  @Output()
  filterConfirmed = new EventEmitter<never>();

  abstract reset(): void;

  protected emitFilterChanged<K extends keyof T>(key: keyof T, val: T[K]): void {
    this.filterCopy[key] = val;
    this.filterChanged?.emit(_.clone(this.filterCopy));
  }


}
