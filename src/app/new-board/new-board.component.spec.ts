import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardComponent } from './new-board.component';

describe('NewBoardComponent', () => {
  let component: NewBoardComponent;
  let fixture: ComponentFixture<NewBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBoardComponent]
    });
    fixture = TestBed.createComponent(NewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
