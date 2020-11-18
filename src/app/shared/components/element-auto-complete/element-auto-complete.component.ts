import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {MatTooltip} from '@angular/material/tooltip';
import {concatAll, debounceTime, map, startWith} from 'rxjs/operators';
import {ObjectUtils} from '../../utils/object.utils';

@Component({
  selector: 'app-element-autocomplete',
  templateUrl: './element-auto-complete.component.html',
  styles: []
})
export class ElementAutoCompleteComponent<T> implements OnInit {

  filteredElements: Observable<T[]>;
  @Input()
  emitOnEmptyValue: boolean;
  @Input()
  label: string;
  @Input()
  valueHasToBeEqualToOneFilter: boolean;
  @Input()
  filterPropertyName: keyof T;
  @Input()
  invalidElementMessage: string;
  @Output()
  isValidElementChanged = new EventEmitter<boolean>();
  @Output()
  valueChanged = new EventEmitter<string>();
  @Output()
  ctrlReady = new EventEmitter<FormControl>();
  isValidElement: boolean;
  @ViewChild('elementTip')
  elementTip: MatTooltip;
  @Output()
  elementChanged = new EventEmitter<T>();
  @Output()
  matToolTipReady = new EventEmitter<MatTooltip>();
  elementCtrl = new FormControl();
  elementValues: T[] = [];
  @Input()
  filterFunction: (val: string) => Observable<T[]>;

  constructor() {
  }

  @Input()
  set isDisabled(val: boolean) {
    val ? this.elementCtrl.disable() : this.elementCtrl.enable();
  }

  @Input()
  set selectedElement(el: T) {
    this.elementCtrl?.setValue(this.elementVal(el));
  }

  get elements(): T[] {
    return this.elementValues;
  }

  @Input()
  set elements(val: T[]) {
    this.elementValues = val;
    if (this.elementCtrl) {
      this._filterFunction(this.elementCtrl.value).subscribe(res => {
        if (!res || this.elementVal(res[0])?.toLowerCase() !== this.elementCtrl.value?.toLowerCase()) {
          this.elementCtrl.setValue('');
        } else if (!!this.elementCtrl.value) {
          this.elementCtrl.setValue(this.elementCtrl.value);
        }
      });
    }
  }

  private get _filterFunction(): (val: string) => Observable<T[]> {
    return this.filterFunction ? this.filterFunction : this.filterElements;
  }

  elementVal(element: T): string {
    return ObjectUtils.getAnyValue(element, this.filterPropertyName);
  }

  ngOnInit(): void {
    let isFirst = true;
    this.filteredElements = this.elementCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      map(value => {
        if (isFirst) {
          isFirst = false;
          return of(this.elements?.slice());
        } else {
          const filteredElements = value ? this._filterFunction(value) : of(this.elements.slice());
          this.updateSelectedElement(value);
          return filteredElements;
        }
      }),
      concatAll()
    );
    this.matToolTipReady.emit(this.elementTip);
    this.ctrlReady.emit(this.elementCtrl);
  }

  displayFn(instrumentName?: string): string | undefined {
    return instrumentName ? instrumentName : undefined;
  }

  updateSelectedElement(value: string): void {
    this._filterFunction(value).subscribe(matchingElements => {
      if (matchingElements.length > 0 &&
        (!this.valueHasToBeEqualToOneFilter || this.valueHasToBeEqualToOneFilter && this.findStrict(value, matchingElements))) {
        this.elementChanged.emit(matchingElements[0]);
        this.valueChanged.emit(value);
        this.isValidElement = true;
        this.elementCtrl.setErrors(null);
      } else if (!!value) {
        this.isValidElement = false;
        this.elementCtrl.setErrors({undefinedElement: true});
      } else if (this.emitOnEmptyValue) {
        this.elementChanged.emit(null);
        this.valueChanged.emit(null);
      }
      this.isValidElementChanged.emit(this.isValidElement);
    });
  }

  private filterElements(name: string): Observable<T[]> {

    name = name?.toLowerCase();
    const res = this.elements?.filter(i => {
      const bo = this.elementVal(i)?.toString()?.toLowerCase().indexOf(name);
      return bo >= 0;
    });
    return of(res);
  }

  private findStrict(value: string, matchingElements: T[]): boolean {
    if (this.filterFunction && !this.elements || this.elements.length === 0) {
      return matchingElements.some(el => this.elementVal(el)?.toString()?.toLowerCase() === value?.toLowerCase());
    }
    return this.elements.some(el => this.elementVal(el)?.toString()?.toLowerCase() === value?.toLowerCase());
  }

}
