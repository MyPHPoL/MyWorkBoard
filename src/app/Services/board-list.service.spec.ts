import { TestBed } from '@angular/core/testing';

import { BoardListService } from './board-list.service';

describe('BoardListService', () => {
  let service: BoardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
