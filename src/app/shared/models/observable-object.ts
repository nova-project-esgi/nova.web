import {BaseOperation, generate, observe, Observer} from 'fast-json-patch';
import {ObjectUtils} from '../utils/object.utils';
import {KeyValue} from '@angular/common';

export class ObservableObject<T>{

  constructor(obj: {object?: T, dstObject?: any, dstCtr?: any}) {
    const dstObj = this.getDstObject(obj);
    if (obj?.object && dstObj){
      ObjectUtils.copyExistingProperties(obj.object, dstObj);
      this.observer = observe(dstObj);
    } else {
      this.observer = observe(obj.object);
    }
    this.object = obj?.object;
    this.dstObject = dstObj;
  }


  get patchableObject(): T | any{
    if (this.object && ! this.dstObject){
      return this.object;
    }
    return ObjectUtils.copyExistingProperties(this.object, this.dstObject);
  }

  get operationsFromSource(): BaseOperation[]{
    if (this.dstObject){
      ObjectUtils.copyExistingProperties(this.object, this.dstObject);
    }
    return generate(this.observer);
  }
  observer: Observer<T>;
  object: T;
  private dstObject: any;


  public static of<T>(obj: {object: T, dstObject?: any, dstCtr?: any},
                      ...changesList: KeyValue<keyof T, T[keyof T]>[]): ObservableObject<T>{
    const observableObject = new ObservableObject<T>(obj);
    if (observableObject && changesList){
      changesList.forEach(kV => observableObject.object[kV.key] = kV.value);
    }
    return observableObject;
  }

  getOperationsFromExternal(obj: any): BaseOperation[]{
    if (this.dstObject){
      ObjectUtils.copyExistingProperties(obj, this.dstObject);
    }
    return generate(this.observer);
  }

  private getDstObject(obj: {dstObject?: any, dstCtr?: any}): any {
    if (obj?.dstObject){
      return obj?.dstObject;
    } else if (obj?.dstCtr){
      return ObjectUtils.tryGetEmptyConstructorObject(obj?.dstCtr);
    }
  }

}
