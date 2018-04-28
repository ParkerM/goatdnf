import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TldGrabberService {

  readonly tldDirectory = '/api/tlds';

  constructor(private http: HttpClient) {
  }

  getTlds(domainName: string): Observable<TldPair> {
    return this.http.get(this.tldDirectory, {responseType: 'text'})
      .pipe(
        flatMap((res: string) => res.split('\n')),
        filter((tld: string) => tld && !tld.startsWith('#')),
        map((tld: string) => new TldPair(tld.toLowerCase(), domainName))
      );
  }
}

export class TldPair {

  readonly domain: string;

  constructor(readonly tld: string, private domainName: string) {
    this.domain = `${domainName}.${tld}`;
  }
}
