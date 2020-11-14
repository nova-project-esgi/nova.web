import {TestBed} from '@angular/core/testing';

import {ApiServiceBase} from './api-service.base';

describe('ApiCrawlerService', () => {
  let service: ApiServiceBase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceBase);
  });

  it('should be created', () => {
    // expect(service).toBeTruthy();
  });
});
