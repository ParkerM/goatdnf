import {async, getTestBed, TestBed} from '@angular/core/testing';

import {TldGrabberService, TldPair} from './tld-grabber.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {toArray} from 'rxjs/operators';

describe('TldGrabberService', () => {
  let injector: TestBed;
  let service: TldGrabberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TldGrabberService]
    });
    injector = getTestBed();
    service = injector.get(TldGrabberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('maps list of TLDs to TldPair domain objects', async(() => {
    const expectedTlds = [
      {domainName: 'hi', tld: 'com', domain: 'hi.com'},
      {domainName: 'hi', tld: 'biz', domain: 'hi.biz'},
      {domainName: 'hi', tld: 'good', domain: 'hi.good'},
    ];

    service.getTlds('hi')
      .pipe(toArray())
      .subscribe((tlds: TldPair[]) => {
        expect(tlds.length).toBe(3);
        expect(tlds).toEqual(expectedTlds);
      });

    const req = httpMock.expectOne(TldGrabberService.tldDirectory);
    expect(req.request.method).toBe('GET');
    req.flush('COM\nBIZ\n#BAD\nGOOD');
  }));
});
