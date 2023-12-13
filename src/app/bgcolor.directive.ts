import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[bgColor]'
})
export class BgcolorDirective implements OnChanges {
  @Input() bgColor = '';

  constructor(private el: ElementRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bgColor']) {
      const newColor = changes['bgColor'].currentValue;
      this.el.nativeElement.style.backgroundColor = newColor;
    }
  }
}