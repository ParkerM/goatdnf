import {inject, TestBed} from '@angular/core/testing';

import {TldGrabberService} from './tld-grabber.service';

describe('TldGrabberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TldGrabberService]
    });
  });

  it('should be created', inject([TldGrabberService], (service: TldGrabberService) => {
    expect(service).toBeTruthy();
  }));
});
