import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, flatMap, map, take, toArray} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TldGrabberService {

  static readonly tldDirectory = '/api/ext/iana/tlds';

  constructor(private http: HttpClient) {
  }

  getTlds(): Observable<string> {
    return this.http.get(TldGrabberService.tldDirectory, {responseType: 'text'})
      .pipe(
        take(1),
        flatMap((res: string) => res.split('\n')),
        filter((tld: string) => tld && !tld.startsWith('#')),
        map((tld: string) => tld.toLowerCase()),
      );
  }

  createExpert(domain: string): Observable<TldDomainExpert> {
    return this.getTlds().pipe(
      toArray(),
      map(tlds => new TldDomainExpert(tlds, domain)));
  }
}

export class TldDomainExpert {
  tlds: string[];
  domain: string;

  constructor(tlds: string[], domain?: string) {
    this.tlds = tlds;
    this.domain = domain ? domain.toLowerCase() : null;
  }

  get tldPairs(): TldPair[] {
    return this.tlds.map(tld => new TldPair(tld.toLowerCase(), this.domain));
  }

  get fqdns(): string[] {
    return this.tlds.map(tld => `${this.domain}.${tld.toLowerCase()}`);
  }

  updateDomain(domain: string) {
    this.domain = domain.toLowerCase();
  }
}

export class TldPair {

  static fromDomain(domain: string): TldPair {
    const parts = domain.split('.');
    if (parts.length < 2) {
      throw new Error(`Required format: example.com. Only found ${parts.length} parts.`);
    }
    const tld = encodeURIComponent(parts[parts.length - 1]);
    const domainName = encodeURIComponent(parts[parts.length - 2]);

    return new TldPair(tld, domainName);
  }

  constructor(readonly tld: string, readonly domainName: string) {
  }

  get domain() {
    return `${this.domainName}.${this.tld}`;
  }
}
