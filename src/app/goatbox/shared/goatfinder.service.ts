import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, merge, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoatfinderService {

  constructor(private http: HttpClient) {
  }

  getWebInfo(domains: string[]): Observable<any> {
    return merge(
      from(domains).pipe(flatMap(domain => this.http.get(domain))),
    );
  }
}
