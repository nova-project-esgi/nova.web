import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {notEmptyArr} from '../../validators/array.validators';
import {SubListElementEditionComponent} from './sub-list-element-edition.component';
import * as _ from 'lodash';

@Component({
  template: ''
})
export abstract class FormListEditionComponent<ChildComponent extends SubListElementEditionComponent<InputElement, OutputElement>, InputElement, OutputElement = InputElement, > implements OnInit, AfterViewInit {

  @ViewChildren('addedChildComponents')
  components: QueryList<ChildComponent>;
  protected _formArray: FormArray;

  @Input()
  elements: InputElement[] = [];


  @Input() set formArray(formArr: FormArray) {
    this._formArray = formArr;
    this._formArray.setValidators(notEmptyArr(this, 'elements'));
    this._formArray.valueChanges.subscribe(val => this.emitElementsChange());
    this._formArray.updateValueAndValidity();
  }

  @Output() elementsChanged = new EventEmitter<OutputElement[]>();


  protected constructor(protected fb: FormBuilder) {
    this._formArray = this.fb.array([], {validators: [notEmptyArr(this, 'elements')]});
    this._formArray.valueChanges.subscribe(val => this.emitElementsChange());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateFormArray();
    this.components.changes.subscribe(value => {
        this.updateFormArray();
      }
    );
  }

  updateFormArray(): void{
    this._formArray?.clear();
    this.components?.forEach(component => this._formArray?.push(component._formGrp));
  }

  onElementDeleted(i: number): void {
    this.elements.splice(i, 1);
    this._formArray.removeAt(i);
  }

  onElementAdded(element: InputElement): void {
    this.elements.push(element);
  }

  onElementChanged(element: OutputElement, i: number): void {
    _.merge(this.elements[i], element);
  }

  emitElementsChange(): void {
    if (this._formArray.valid) {
      // this.elementsChanged.emit(this.elements);
      this.elementsChanged.emit(this.getOutputElements());
    }
  }
  getOutputElements(): OutputElement[]{
    return this.elements as unknown as OutputElement[];
  }
}


