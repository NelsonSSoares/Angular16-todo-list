import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[fontWeightResizer]',
    standalone: true
})
export class FontWeightResizerDirective implements OnChanges{

  @Input('fontWeightResizer') public fontWeightResizer!: string;

  public defaultFontWeight = 'normal';

  private el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
    el.nativeElement.style.customProperty = true;

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style.fontWeight = this.fontWeightResizer || this.defaultFontWeight;
  }


}
