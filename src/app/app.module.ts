import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoatboxModule} from './goatbox/goatbox.module';
import {MatCardModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    GoatboxModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
