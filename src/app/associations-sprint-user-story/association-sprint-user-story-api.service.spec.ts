import { TestBed } from '@angular/core/testing';

import { AssociationSprintUserStoryApiService } from './association-sprint-user-story-api.service';

describe('AssociationSprintUserStoryApiService', () => {
  let service: AssociationSprintUserStoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationSprintUserStoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
