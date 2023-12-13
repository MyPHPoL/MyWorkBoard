import { BgcolorDirective } from './bgcolor.directive';
import { ElementRef } from '@angular/core';

describe('BgcolorDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: {} } as ElementRef;
    const directive = new BgcolorDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
