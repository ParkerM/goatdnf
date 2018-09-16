import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoatformComponent} from './goatform.component';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('GoatformComponent', () => {
  let component: GoatformComponent;
  let fixture: ComponentFixture<GoatformComponent>;
  let btn: HTMLButtonElement;
  let domainInput: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        GoatformComponent,
      ],
      providers: [
        FormBuilder
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.spyOn(component, 'submitSearch');
    btn = fixture.debugElement.nativeElement.querySelector('button');
    domainInput = fixture.debugElement.nativeElement.querySelector('input');
  });

  it('submits input on button click', () => {
    setInputValue(domainInput, 'hello');
    btn.click();

    expect(component.submitSearch).toHaveBeenCalledWith('hello');
  });

  it('requires domain input before allowing submit', () => {
    expect(component.goatForm.valid).toBe(false);
    setInputValue(domainInput, 'hello');
    expect(component.goatForm.valid).toBe(true);

    btn.click();
    expect(component.submitSearch).toHaveBeenCalledWith('hello');
  });

  function setInputValue(inputEl: HTMLInputElement, value: any) {
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});
