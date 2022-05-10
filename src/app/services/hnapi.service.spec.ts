import { TestBed } from '@angular/core/testing';

import { HnapiService } from './hnapi.service';

describe('HnapiService', () => {
  let service: HnapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HnapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
