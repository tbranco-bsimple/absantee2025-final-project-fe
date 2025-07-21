import { TestBed } from '@angular/core/testing';

import { UserStoryApiService } from './user-story-api.service';

describe('UserStoryApiService', () => {
  let service: UserStoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
