import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoatboxComponent} from './goatbox.component';
import {MatCardModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TldGrabberService, TldPair} from './shared/tld-grabber.service';
import {Subject} from 'rxjs';
import {GoatfinderService} from './shared/goatfinder.service';

describe('GoatboxComponent', () => {
  describe('should simply', () => {
    it('get and set the stored domain name', () => {
      const goatService: GoatfinderService = {
        getWebInfo: jest.fn(),
      } as GoatfinderService;
      const tldService: TldGrabberService = {
        getTlds: jest.fn(),
      } as TldGrabberService;

      const comp = new GoatboxComponent(goatService, tldService);

      comp.domainName = 'original bonker';
      expect(comp.domainName).toEqual('original bonker');

      comp.domainName = 'Doink_Prime';
      expect(comp.domainName).toEqual('Doink_Prime');
    });
  });

  describe('when integrated', () => {
    let component: GoatboxComponent;
    let fixture: ComponentFixture<GoatboxComponent>;

    let mockTldSubject: Subject<TldPair>;
    const mockTldService = {
      getTlds: jest.fn(() => mockTldSubject)
    };

    beforeEach(async(() => {
      mockTldSubject = new Subject<TldPair>();
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
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(GoatboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    }));

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

    it('should update the display according to input domain', async(() => {
      const el = fixture.nativeElement;

      component.domainUpdated.next('hello');
      mockTldSubject.next(new TldPair('com', 'hello'));
      mockTldSubject.complete();
      fixture.detectChanges();

      expect(el.innerHTML).toContain('hello.com');

      component.domainUpdated.next('goodbye');
      mockTldSubject.next(new TldPair('com', 'goodbye'));
      fixture.detectChanges();

      expect(el.textContent).toContain('goodbye.com');
    }));
  });
});
