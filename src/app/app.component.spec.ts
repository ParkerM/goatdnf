import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GoatboxComponent} from './goatbox/goatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {GoatformComponent} from './goatbox/goatform/goatform.component';
import {By} from '@angular/platform-browser';
import {FormBuilder} from '@angular/forms';

describe('AppComponent', () => {
  describe('simply', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [FormBuilder],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    }));

    it('should display GoatBoxComponent and GoatFormComponent', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();

      const gb = fixture.debugElement.query(By.css('app-goatbox')) as GoatboxComponent;
      const gf = fixture.debugElement.query(By.css('app-goatform')) as GoatformComponent;
      expect(gb).toBeTruthy();
      expect(gf).toBeTruthy();
    });
  });

  describe('integrated', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          GoatformComponent
        ],
        providers: [FormBuilder],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
    }));

    xit('should propagate value changes from GoatForm to GoatBox', () => {


      component.appForm.get('goatForm').get('domainInput').setValue('baaaa');
      fixture.detectChanges();


    });
  });
});
