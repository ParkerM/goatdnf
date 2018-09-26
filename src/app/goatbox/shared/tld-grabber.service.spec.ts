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
    const expectedTlds = ['com', 'biz', 'good'];

    service.getTlds()
      .pipe(toArray())
      .subscribe((tlds: string[]) => {
        expect(tlds.length).toBe(3);
        expect(tlds).toEqual(expectedTlds);
      });

    const req = httpMock.expectOne(TldGrabberService.tldDirectory);
    expect(req.request.method).toBe('GET');
    req.flush('COM\nBIZ\n#BAD\nGOOD');
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
