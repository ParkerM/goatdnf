import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoatboxComponent} from './goatbox.component';
import {MatCardModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TldGrabberService, TldPair} from '../service/tld-grabber.service';
import {Subject} from 'rxjs';

describe('GoatboxComponent', () => {
  let component: GoatboxComponent;
  let fixture: ComponentFixture<GoatboxComponent>;

  const mockTldSubject = new Subject<TldPair>();
  const mockTldService = {
    getTlds: jest.fn(() => mockTldSubject)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [GoatboxComponent],
      providers: [{provide: TldGrabberService, useValue: mockTldService}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => mockTldSubject.complete());

  it('should display list of domains according to page size', () => {
    component.paginator.pageSize = 5;
    const tldResponses = [
      new TldPair('tld1', 'domain'),
      new TldPair('tld2', 'domain'),
      new TldPair('tld3', 'domain'),
      new TldPair('tld4', 'domain'),
      new TldPair('tld5', 'domain'),
      new TldPair('tld6', 'domain'),
    ];

    tldResponses.forEach(tldPair => mockTldSubject.next(tldPair));
    mockTldSubject.complete();

    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.textContent).toContain(tldResponses[0].domain);
    expect(el.textContent).toContain(tldResponses[1].domain);
    expect(el.textContent).toContain(tldResponses[2].domain);
    expect(el.textContent).toContain(tldResponses[3].domain);
    expect(el.textContent).toContain(tldResponses[4].domain);
    expect(el.textContent).not.toContain(tldResponses[5].domain);
  });
});
