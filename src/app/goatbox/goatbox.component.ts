import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GoatboxModule} from './goatbox.module';
import {TldGrabberService, TldPair} from '../service/tld-grabber.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-goatbox',
  templateUrl: './goatbox.component.html',
  styleUrls: ['./goatbox.component.css']
})
export class GoatboxComponent implements OnInit, AfterViewInit {

  readonly DOMAIN_NAME = 'example'; // TODO: fix me
  private tlds: TldPair[] = [];
  private tldSub: Observable<TldPair>;

  displayedColumns = ['tld', 'domain'];
  public dataSource: MatTableDataSource<TldPair>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TldGrabberService) {
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
  }

  // getAllGoats(): void {
  //   Observable.create(pipe(
  //     merge(this.paginator.page),
  //     starts
  //   ));
  // }
}
