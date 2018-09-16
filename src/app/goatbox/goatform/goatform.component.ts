import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-goatform',
  templateUrl: './goatform.component.html',
  styleUrls: ['./goatform.component.scss']
})
export class GoatformComponent implements OnInit {
  goatForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.goatForm = this.fb.group({
      domainInput: this.fb.control('', Validators.required)
    });
  }

  submitSearch(domain: string) {
    console.log(domain);
  }
}
