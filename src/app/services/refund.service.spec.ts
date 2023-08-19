import { TestBed } from '@angular/core/testing';

import { RefundService } from './refund.service';

describe('RefundService', () => {
  let service: RefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
