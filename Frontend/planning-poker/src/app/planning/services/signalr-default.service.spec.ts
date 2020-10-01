import { TestBed } from '@angular/core/testing';

import { SignalrDefaultService } from './signalr-default.service';

describe('SignalrDefaultService', () => {
  let service: SignalrDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
