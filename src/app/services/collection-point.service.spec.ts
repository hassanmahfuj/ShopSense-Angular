import { TestBed } from '@angular/core/testing';

import { CollectionPointService } from './collection-point.service';

describe('CollectionPointService', () => {
  let service: CollectionPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
