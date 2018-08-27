import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GoatboxComponent} from './goatbox/goatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // can't figure out how the hell to make HttpClient injection errors go away without this import
        MatTableModule
      ],
      declarations: [
        AppComponent,
        GoatboxComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should display GoatBoxComponent', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();

    expect(fixture.nativeElement.outerHTML).toContain('app-goatbox');
  }));
});
