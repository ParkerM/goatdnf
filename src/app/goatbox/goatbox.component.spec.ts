import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoatboxComponent} from './goatbox.component';
import {MatCardModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('GoatboxComponent', () => {
  let component: GoatboxComponent;
  let fixture: ComponentFixture<GoatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [ GoatboxComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
