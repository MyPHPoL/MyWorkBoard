import { ElementRef } from '@angular/core';
import { TaskColorDirective } from './task-color.directive';

describe('TaskColorDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: {} } as ElementRef;
    const directive = new TaskColorDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
