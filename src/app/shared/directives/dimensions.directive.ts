import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDimensions]'
})
export class DimensionsDirective {

  @Output() dimensionChanged = new EventEmitter<DOMRect>();

  htmlElement = this.elRef.nativeElement;
  
  get dimensions(): DOMRect {
    return this.elRef?.nativeElement?.getBoundingClientRect();
  }

  constructor(public elRef: ElementRef<HTMLElement>) {

  }

  @HostListener('window:resize')
  public detectResize(): void {
    this.elRef.nativeElement.getBoundingClientRect();
    this.dimensionChanged.emit(this.elRef.nativeElement.getBoundingClientRect());
    // console.log(this.elRef.nativeElement.offsetWidth);
    // console.log(this.elRef.nativeElement.offsetHeight);
    // Do you magic here ...
  }

}
