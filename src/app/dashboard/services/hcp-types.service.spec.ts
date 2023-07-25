import { TestBed } from '@angular/core/testing';

import { HcpTypesService } from './hcp-types.service';

describe('HcpTypesService', () => {
  let service: HcpTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcpTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
