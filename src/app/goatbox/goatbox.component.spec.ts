import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoatboxComponent} from './goatbox.component';
import {MatCardModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TldDomainExpert, TldGrabberService} from './shared/tld-grabber.service';
import {Subject} from 'rxjs';
import {GoatfinderService} from './shared/goatfinder.service';

describe('GoatboxComponent', () => {
  describe('should simply', () => {
    it('get and set the stored domain name', () => {
      const goatService: GoatfinderService = {
        getWebInfo: jest.fn(),
      } as any;
      const tldService: TldGrabberService = {
        getTlds: jest.fn(),
        createExpert: jest.fn(),
      } as any;

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

    let mockTldSubject: Subject<string>;
    let mockExpert: Subject<TldDomainExpert>;
    const mockTldService = {
      getTlds: jest.fn(() => mockTldSubject),
      createExpert: jest.fn(() => mockExpert),
    };

    beforeEach(async(() => {
      mockTldSubject = new Subject<string>();
      mockExpert = new Subject<TldDomainExpert>();
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
      });
    }));

    afterEach(() => mockTldSubject.complete());

    it('should display list of domains according to page size', async(() => {
      fixture.detectChanges();
      component.paginator.pageSize = 5;

      const tldResponses = ['tld1', 'tld2', 'tld3', 'tld4', 'tld5', 'tld6'];
      mockExpert.next(new TldDomainExpert(tldResponses, 'test'));
      mockExpert.complete();

      fixture.detectChanges();

      const elContent: HTMLElement = fixture.nativeElement.textContent;
      expect(elContent).toContain('tld1');
      expect(elContent).toContain('tld2');
      expect(elContent).toContain('tld3');
      expect(elContent).toContain('tld4');
      expect(elContent).toContain('tld5');
      expect(elContent).not.toContain('tld6');
    }));

    it('emits domainName when set via setter', () => {
      const domainUpdated = jest.spyOn(component.domainUpdated, 'next');

      component.domainName = 'emit me';
      expect(domainUpdated).toHaveBeenCalledWith('emit me');

      component.domainName = 'pickme!!';
      expect(domainUpdated).toHaveBeenCalledWith('pickme!!');
    });

    it('should update the display according to input domain', () => {
      fixture.detectChanges();
      component.paginator.pageSize = 5;
      const el: HTMLElement = fixture.nativeElement;

      mockExpert.next(new TldDomainExpert(['com'], 'example'));
      mockExpert.complete();

      fixture.detectChanges();
      expect(el.textContent).toContain('example.com');

      component.domainUpdated.next('hello');
      fixture.detectChanges();
      expect(el.textContent).toContain('hello.com');

      component.domainUpdated.next('goodbye');
      fixture.detectChanges();
      expect(el.textContent).toContain('goodbye.com');
    });

    it('should initialize domain name', () => {
      const expectedDefault = 'example';

      fixture.detectChanges();
      component.paginator.pageSize = 5;

      mockExpert.next(new TldDomainExpert(['big', 'biz'], expectedDefault));
      mockExpert.complete();

      fixture.detectChanges();

      expect(mockTldService.createExpert).toHaveBeenCalledWith(expectedDefault);

      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent).toContain(`${expectedDefault}.big`);
      expect(el.textContent).toContain(`${expectedDefault}.biz`);
    });
  });
});
