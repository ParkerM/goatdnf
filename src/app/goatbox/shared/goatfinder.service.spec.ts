import {async, getTestBed, TestBed} from '@angular/core/testing';

import {GoatfinderService} from './goatfinder.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {toArray} from 'rxjs/operators';
import {TldDomainExpert} from './tld-grabber.service';

describe('GoatfinderService', () => {
  let injector: TestBed;
  let service: GoatfinderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoatfinderService]
    });
    injector = getTestBed();
    service = injector.get(GoatfinderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('queries info on given domain namees', async(() => {
    const domains = ['nom.com', 'wiz.biz', 'fun.bun'];
    service.getWebInfo(domains)
      .pipe(toArray())
      .subscribe(data => {
        expect(data.length).toEqual(3);
        expect(data).toEqual(['wiz', 'fun', 'nom']);
      });

    const nomReq = httpMock.expectOne(domains[0]);
    const wizReq = httpMock.expectOne(domains[1]);
    const funReq = httpMock.expectOne(domains[2]);
    expect(nomReq.request.method).toBe('GET');
    expect(wizReq.request.method).toBe('GET');
    expect(funReq.request.method).toBe('GET');

    wizReq.flush('wiz');
    funReq.flush('fun');
    nomReq.flush('nom');
  }));

  it('queries info on given TLD expert', async(() => {
    const tldExpert = new TldDomainExpert(['com', 'biz', 'bun'], 'funbrain');
    const expectedDomains = ['funbrain.com', 'funbrain.biz', 'funbrain.bun'];

    expect(expect.assertions(5));
    service.getExpertInfo(tldExpert)
      .pipe(toArray())
      .subscribe(data => {
        expect(data.length).toEqual(3);
        expect(data).toEqual(['com body', 'biz fizz', 'fun on a bun']);
      });

    const comReq = httpMock.expectOne(expectedDomains[0]);
    const bizReq = httpMock.expectOne(expectedDomains[1]);
    const bunReq = httpMock.expectOne(expectedDomains[2]);
    expect(comReq.request.method).toBe('GET');
    expect(bizReq.request.method).toBe('GET');
    expect(bunReq.request.method).toBe('GET');

    bizReq.flush('com body');
    bunReq.flush('biz fizz');
    comReq.flush('fun on a bun');
  }));
});
