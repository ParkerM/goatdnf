import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TldGrabberService {

  static readonly tldDirectory = '/api/ext/iana/tlds';

  constructor(private http: HttpClient) {
  }

  getTlds(domainName: string): Observable<TldPair> {
    return this.http.get(TldGrabberService.tldDirectory, {responseType: 'text'})
      .pipe(
        flatMap((res: string) => res.split('\n')),
        filter((tld: string) => tld && !tld.startsWith('#')),
        map((tld: string) => new TldPair(tld.toLowerCase(), domainName))
      );
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
