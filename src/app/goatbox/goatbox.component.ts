import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TldGrabberService, TldPair} from './shared/tld-grabber.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {GoatfinderService} from './shared/goatfinder.service';

@Component({
  selector: 'app-goatbox',
  templateUrl: './goatbox.component.html',
  styleUrls: ['./goatbox.component.scss']
})
export class GoatboxComponent implements OnInit, AfterViewInit {

  readonly DOMAIN_NAME = 'example'; // TODO: fix me
  private tlds: TldPair[] = [];
  private tldSub: Observable<TldPair>;
  private _domainName: string;

  displayedColumns = ['tld', 'domain'];
  dataSource: MatTableDataSource<TldPair>;

  domainData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() domainUpdated: Event;

  @Input()
  set domainName(name: string) {
    this._domainName = name;
  }
  get domainName() {
    return this._domainName;
  }

  constructor(private goatFinderService: GoatfinderService,
              private service: TldGrabberService) {
    this.tldSub = this.service.getTlds(this.DOMAIN_NAME);
  }

  ngOnInit(): void {
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.tldSub.subscribe(tldPair => this.tlds.push(tldPair),
      () => {

      },
      () => {
        this.dataSource = new MatTableDataSource<TldPair>(this.tlds);
        this.dataSource.paginator = this.paginator;
      }
    );
    this.goatFinderService.getWebInfo(['google.com', 'gatech.edu', 'nws.gov', 'junk.blargh'])
      .subscribe(foo => this.domainData.push(foo));
  }
}
