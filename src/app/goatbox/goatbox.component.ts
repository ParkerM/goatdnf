import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TldDomainExpert, TldGrabberService, TldPair} from './shared/tld-grabber.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {GoatfinderService} from './shared/goatfinder.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-goatbox',
  templateUrl: './goatbox.component.html',
  styleUrls: ['./goatbox.component.scss']
})
export class GoatboxComponent implements OnInit, AfterViewInit {

  readonly DEFAULT_DOMAIN_NAME = 'example'; // TODO: fix me
  private expert: TldDomainExpert;
  private _domainName: string;

  displayedColumns = ['tld', 'domain'];
  dataSource: MatTableDataSource<TldPair>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  domainUpdated: Subject<string>;

  @Input()
  set domainName(name: string) {
    this._domainName = name;
    this.domainUpdated.next(name);
  }

  get domainName() {
    return this._domainName;
  }

  constructor(private goatFinderService: GoatfinderService,
              private service: TldGrabberService) {
    this.domainUpdated = new Subject<string>();
    this.dataSource = new MatTableDataSource<TldPair>();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.service.createExpert(this.DEFAULT_DOMAIN_NAME)
      .pipe(first())
      .subscribe(
        (expert: TldDomainExpert) => this.expert = expert,
        (err: any) => console.error(err),
        () => {
          this.dataSource.data = this.expert.tldPairs;
          this.dataSource.paginator = this.paginator;
          this.domainUpdated.next(this.expert.domain);
        }
      );

    this.domainUpdated.subscribe((domain: string) => {
      this.expert.updateDomain(domain);
      this.goatFinderService.getExpertInfo(this.expert);
      this.dataSource.data = this.expert.tldPairs;
    });
  }
}
