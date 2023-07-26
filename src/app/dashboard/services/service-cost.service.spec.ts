import { TestBed } from '@angular/core/testing';

import { ServiceCostService } from './service-cost.service';

describe('ServiceCostService', () => {
  let service: ServiceCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
