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
      const goatService: GoatfinderService = jest.fn() as any;
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
    let mockGoatResponse: Subject<any>;

    let mockTldService: TldGrabberService;
    let mockGoatService: GoatfinderService;

    beforeEach(async(() => {
      mockTldSubject = new Subject<string>();
      mockExpert = new Subject<TldDomainExpert>();
      mockGoatResponse = new Subject();

      mockTldService = {
        getTlds: jest.fn(() => mockTldSubject),
        createExpert: jest.fn(() => mockExpert),
      } as any;

      mockGoatService = {
        getExpertInfo: jest.fn(() => mockGoatResponse),
      } as any;

      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          HttpClientTestingModule,
          MatCardModule,
          MatPaginatorModule,
          MatTableModule,
        ],
        declarations: [GoatboxComponent],
        providers: [
          {provide: TldGrabberService, useValue: mockTldService},
          {provide: GoatfinderService, useValue: mockGoatService},
        ]
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

    it('should emit domainName when set via setter', () => {
      const domainUpdated = jest.spyOn(component.domainUpdated, 'next');

      component.domainName = 'emit me';
      expect(domainUpdated).toHaveBeenCalledWith('emit me');

      component.domainName = 'pickme!!';
      expect(domainUpdated).toHaveBeenCalledWith('pickme!!');
    });

    it('should initialize domain name and fetch data', () => {
      const expectedDefault = 'example';
      const defaultExpert = new TldDomainExpert(['big', 'biz'], expectedDefault);

      fixture.detectChanges();

      component.paginator.pageSize = 5;
      mockExpert.next(defaultExpert);
      mockExpert.complete();

      fixture.detectChanges();

      expect(mockTldService.createExpert).toHaveBeenCalledWith(expectedDefault);
      expect(mockGoatService.getExpertInfo).toHaveBeenCalledWith(defaultExpert);

      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent).toContain(`${expectedDefault}.big`);
      expect(el.textContent).toContain(`${expectedDefault}.biz`);
    });

    describe('on domain name update', () => {
      let tlds: string[];
      let el: HTMLElement;

      beforeEach(() => {
        fixture.detectChanges();
        component.paginator.pageSize = 5;

        tlds = ['com', 'biz'];
        el = fixture.nativeElement;

        mockExpert.next(new TldDomainExpert(tlds, 'example'));
        mockExpert.complete();
      });

      it('should update the display according to input domain', () => {
        component.domainUpdated.next('hello');
        fixture.detectChanges();
        expect(el.textContent).toContain('hello.com');

        component.domainUpdated.next('goodbye');
        fixture.detectChanges();
        expect(el.textContent).toContain('goodbye.com');
      });

      it('should query service on domain update', () => {
        component.domainUpdated.next('goats');
        expect(mockGoatService.getExpertInfo).toHaveBeenCalledWith(new TldDomainExpert(tlds, 'goats'));

        component.domainUpdated.next('boats');
        expect(mockGoatService.getExpertInfo).toHaveBeenCalledWith(new TldDomainExpert(tlds, 'boats'));
      });
    });
  });
});
