import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFilterComponent } from './set-filter.component';

describe('SetFilterComponent', () => {
  let component: SetFilterComponent;
  let fixture: ComponentFixture<SetFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetFilterComponent]
    });
    fixture = TestBed.createComponent(SetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
