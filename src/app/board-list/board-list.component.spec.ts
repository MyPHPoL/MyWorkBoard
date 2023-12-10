import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardListComponent]
    });
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
