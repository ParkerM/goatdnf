import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-goatform',
  templateUrl: './goatform.component.html',
  styleUrls: ['./goatform.component.scss'],
})
export class GoatformComponent {
  @Output() domainChange = new EventEmitter<string>();

  goatForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.goatForm = this.fb.group({
      domainInput: this.fb.control('', Validators.required)
    });
  }

  onSubmit(value: string): void {
    this.domainChange.emit(value);
  }
}
