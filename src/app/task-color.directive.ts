import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTaskColor]'
})
export class TaskColorDirective implements OnChanges {
  @Input() appTaskColor = '';

  constructor(private el: ElementRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appTaskColor']) {
      const newColor = changes['appTaskColor'].currentValue;
      this.el.nativeElement.style.color = newColor;
    }
  }
}
