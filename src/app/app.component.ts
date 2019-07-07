import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GoatformComponent} from './goatbox/goatform/goatform.component';
import {GoatboxComponent} from './goatbox/goatbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Goat Domain Name Finder';
  appForm: FormGroup;

  searchText: string;

  @ViewChild('gf', { static: true }) gf: GoatformComponent;
  @ViewChild('gb', { static: true }) gb: GoatboxComponent;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.appForm = this.fb.group({
      goatForm: this.gf.goatForm,
    });
  }

  searchButtonClicked(event: string) {
    this.searchText = event;
  }
}
