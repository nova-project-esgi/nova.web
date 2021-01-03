import {Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNgReach]'
})
export class NgReachDirective implements OnInit, OnChanges {

  @Input() appNgReach: number;
  @Input() appNgReachStep = 1;
  @Input() appNgReachStart = 0;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    this.container.createEmbeddedView(this.template);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let i = this.appNgReachStart; i < this.appNgReach; i += this.appNgReachStep) {
      this.container.createEmbeddedView(this.template, {index: i});
    }
  }

}
