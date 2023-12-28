import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterValidatorComponent } from './register-validator.component';

describe('RegisterValidatorComponent', () => {
  let component: RegisterValidatorComponent;
  let fixture: ComponentFixture<RegisterValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterValidatorComponent]
    });
    fixture = TestBed.createComponent(RegisterValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
