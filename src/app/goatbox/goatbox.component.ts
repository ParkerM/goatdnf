import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TldGrabberService, TldPair} from './shared/tld-grabber.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GoatfinderService} from './shared/goatfinder.service';

@Component({
  selector: 'app-goatbox',
  templateUrl: './goatbox.component.html',
  styleUrls: ['./goatbox.component.scss']
})
export class GoatboxComponent implements OnInit, AfterViewInit {

  readonly DEFAULT_DOMAIN_NAME = 'example'; // TODO: fix me
  private tlds: TldPair[] = [];
  private tldSub: Observable<TldPair>;
  private _domainName: string;

  displayedColumns = ['tld', 'domain'];
  dataSource: MatTableDataSource<TldPair>;
  dataSubject = new BehaviorSubject<any[]>([]);

  domainData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  domainUpdated: Subject<string>;

  @Input()
  set domainName(name: string) {
    this._domainName = name;
    this.dataSubject.next()
  }
  get domainName() {
    return this._domainName;
  }

  constructor(private goatFinderService: GoatfinderService,
              private service: TldGrabberService) {
    this.domainUpdated = new Subject<string>();
    this.tldSub = this.service.getTlds();
    this.dataSource = new MatTableDataSource<TldPair>(this.tlds);
  }

  ngOnInit(): void {
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.tldSub.subscribe(tld => this.tlds.push(tld),
      () => {

      },
      () => {
        this.dataSource.paginator = this.paginator;
      }
    );

    this.domainUpdated.subscribe((domain: string) => {
      this.tlds = this.tlds.map((tld: TldPair) => new TldPair(tld.tld, domain));
      this.dataSource.data = this.tlds;
    });
    this.goatFinderService.getWebInfo(['google.com', 'gatech.edu', 'nws.gov', 'junk.blargh'])
      .subscribe(foo => this.domainData.push(foo));
  }
}
