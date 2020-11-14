import {ElementRef} from '@angular/core';

export class DomUtils {
  public static getFirstSizedParentElement(element: ElementRef): HTMLElement | undefined{
    try{
      let parentElement = element.nativeElement.parentElement;
      while (parentElement.clientWidth === 0 && parentElement.clientHeight === 0){
        parentElement = parentElement.parentElement;
      }
      return parentElement;
    }catch (e) {
      return undefined;
    }
  }
}
