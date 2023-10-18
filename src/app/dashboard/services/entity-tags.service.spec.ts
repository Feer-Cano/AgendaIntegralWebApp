import { TestBed } from '@angular/core/testing';

import { EntityTagsService } from './entity-tags.service';

describe('EntityTagsService', () => {
  let service: EntityTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
