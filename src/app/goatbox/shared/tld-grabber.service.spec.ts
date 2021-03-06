import {async, getTestBed, TestBed} from '@angular/core/testing';
import {TldDomainExpert, TldGrabberService, TldPair} from './tld-grabber.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {toArray} from 'rxjs/operators';
import {of} from 'rxjs';

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

  it('fetches TLDs from IANA directory', async(() => {
    const expectedTlds = ['com', 'biz', 'good'];

    expect.assertions(3);
    service.getTlds()
      .pipe(toArray())
      .subscribe((tlds: string[]) => {
        expect(tlds.length).toBe(3);
        expect(tlds).toEqual(expectedTlds);
      });

    const req = httpMock.expectOne('/api/ext/iana/tlds');
    expect(req.request.method).toBe('GET');
    req.flush('COM\nBIZ\n#BAD\nGOOD');
  }));

  it('creates an expert with a given domain', async(() => {
    const expectedExpert = new TldDomainExpert(['biz', 'buz'], 'static');

    service.getTlds = jest.fn(() => {
      return of('biz', 'buz');
    });

    expect.assertions(1);
    service.createExpert('static').subscribe(actual => {
      expect(actual).toEqual(expectedExpert);
    });
  }));
});

describe('TldPair', () => {
  it('returns concatenated domain name with getter', () => {
    expect(new TldPair('com', 'hi').domain).toEqual('hi.com');
    expect(new TldPair('abdfsklas', 'oof').domain).toEqual('oof.abdfsklas');
  });

  it('creates a TldPair from a simple qualified domain string', () => {
    const pairHello: TldPair = TldPair.fromDomain('hello.com');
    expect(pairHello.domainName).toEqual('hello');
    expect(pairHello.tld).toEqual('com');
    expect(pairHello.domain).toEqual('hello.com');

    const pairGoodbye: TldPair = TldPair.fromDomain('goodbye.bizness');
    expect(pairGoodbye.domainName).toEqual('goodbye');
    expect(pairGoodbye.tld).toEqual('bizness');
    expect(pairGoodbye.domain).toEqual('goodbye.bizness');

    expect(() => TldPair.fromDomain('evil')).toThrow(Error);

    const terriblePairable = TldPair.fromDomain('very#$&*(#$<>/[]{}.#$&*(#$<>/[]{}evil');
    expect(terriblePairable.domainName).toEqual('very%23%24%26*(%23%24%3C%3E%2F%5B%5D%7B%7D');
    expect(terriblePairable.tld).toEqual('%23%24%26*(%23%24%3C%3E%2F%5B%5D%7B%7Devil');
    expect(terriblePairable.domain).toEqual('very%23%24%26*(%23%24%3C%3E%2F%5B%5D%7B%7D.%23%24%26*(%23%24%3C%3E%2F%5B%5D%7B%7Devil');
  });
});

describe('TldDomainExpert', () => {
  it('initializes TLD array', () => {
    const tldDomainExpert = new TldDomainExpert(['com', 'biz', 'co.uk']);

    expect(tldDomainExpert.tldPairs).toEqual([
      new TldPair('com', null),
      new TldPair('biz', null),
      new TldPair('co.uk', null),
    ]);
  });

  it('initializes TLD array with optional domain arg', () => {
    const tldDomainExpert = new TldDomainExpert(['com', 'biz', 'co.uk'], 'poise');

    expect(tldDomainExpert.tldPairs).toEqual([
      new TldPair('com', 'poise'),
      new TldPair('biz', 'poise'),
      new TldPair('co.uk', 'poise'),
    ]);
  });

  it('returns lowercased pairs', () => {
    const tldDomainExpert = new TldDomainExpert(['com', 'BIZ', 'cO.UkFoRAGEr'], 'pOiSe');

    expect(tldDomainExpert.tldPairs).toEqual([
      new TldPair('com', 'poise'),
      new TldPair('biz', 'poise'),
      new TldPair('co.ukforager', 'poise'),
    ]);
  });

  it('updates domain to given value lowercased', () => {
    const tldDomainExpert = new TldDomainExpert(['com', 'biz'], 'oldies');

    expect(tldDomainExpert.tldPairs).toEqual([
      new TldPair('com', 'oldies'),
      new TldPair('biz', 'oldies'),
    ]);

    tldDomainExpert.updateDomain('nUwave');
    expect(tldDomainExpert.tldPairs).toEqual([
      new TldPair('com', 'nuwave'),
      new TldPair('biz', 'nuwave'),
    ]);
  });

  it('produces collection of formatted FQDNs', () => {
    const tldDomainExpert = new TldDomainExpert(['con', 'Cat'], 'natuRal');
    const expectedFqdns = ['natural.con', 'natural.cat'];

    expect(tldDomainExpert.fqdns).toEqual(expectedFqdns);
  });
});
