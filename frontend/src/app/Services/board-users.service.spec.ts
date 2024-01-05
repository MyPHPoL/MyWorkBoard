import { TestBed } from '@angular/core/testing';

import { BoardUsersService } from './board-users.service';

describe('BoardUsersService', () => {
  let service: BoardUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
