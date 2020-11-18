import { TestBed } from '@angular/core/testing';

import { TranslatedEventService } from './translated-event.service';

describe('EventService', () => {
  let service: TranslatedEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatedEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
