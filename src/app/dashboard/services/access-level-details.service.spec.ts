import { TestBed } from '@angular/core/testing';

import { AccessLevelDetailsService } from './access-level-details.service';

describe('AccessLevelDetailsService', () => {
  let service: AccessLevelDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessLevelDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
