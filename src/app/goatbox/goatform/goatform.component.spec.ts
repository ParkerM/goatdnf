import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GoatformComponent} from './goatform.component';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import SpyInstance = jest.SpyInstance;

describe('GoatformComponent', () => {
  let component: GoatformComponent;
  let fixture: ComponentFixture<GoatformComponent>;
  let btn: HTMLButtonElement;
  let domainInput: HTMLInputElement;
  let outputSpy: SpyInstance;

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
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoatformComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      outputSpy = jest.spyOn(component.domainChange, 'emit');
      btn = fixture.debugElement.nativeElement.querySelector('button');
      domainInput = fixture.debugElement.nativeElement.querySelector('input');
    });
  }));

  it('submits input on button click', () => {
    setInputValue(domainInput, 'hello');
    btn.click();

    expect(outputSpy).toBeCalledTimes(1);
    expect(outputSpy).toHaveBeenCalledWith('hello');
  });

  it('requires domain input before allowing submit', () => {
    setInputValue(domainInput, '');
    expect(btn.disabled).toBe(true);

    submitForm();
    expect(outputSpy).not.toHaveBeenCalled();

    setInputValue(domainInput, 'this test took three days to get working and i am not upset about it whatsoever');
    expect(btn.disabled).toBe(false);

    submitForm();
    expect(outputSpy)
      .toHaveBeenCalledWith('this test took three days to get working and i am not upset about it whatsoever');
  });

  describe('input element', () => {
    let inputEl: HTMLInputElement;

    beforeEach(() => {
      inputEl = fixture.nativeElement.querySelector('input');
    });

    it('disables autocomplete', () => {
      expect(inputEl.autocomplete).toEqual('off');
    });

    it('sets placeholder', () => {
      expect(inputEl.placeholder).toEqual('Domain');
    });
  });

  function setInputValue(inputEl: HTMLInputElement, value: any) {
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function submitForm() {
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
  }
});
