import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoatboxComponent} from './goatbox.component';

describe('GoatboxComponent', () => {
  let component: GoatboxComponent;
  let fixture: ComponentFixture<GoatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoatboxComponent ]
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
