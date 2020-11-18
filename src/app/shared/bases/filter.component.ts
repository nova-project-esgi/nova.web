import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  template: ''
})
export abstract class FilterComponent<T> {

  filterGrp: FormGroup;

  @Input()
  filter: T = {} as T;

  @Output()
  filterChanged = new EventEmitter<T>();

  @Output()
  filterReset = new EventEmitter<boolean>();

  abstract reset(): void;

  protected emitFilterChanged<K extends keyof T>(key: keyof T, val: T[K]): void {
    this.filter[key] = val;
    this.filterChanged?.emit(this.filter);
  }


}
