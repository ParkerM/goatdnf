import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoatboxModule} from './goatbox/goatbox.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    GoatboxModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
