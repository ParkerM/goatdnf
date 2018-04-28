import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {GoatboxComponent} from './goatbox/goatbox.component';
import {HttpClientModule} from '@angular/common/http';
import {TldGrabberService} from './service/tld-grabber.service';
import {MatExpansionModule, MatListModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    GoatboxComponent
  ],
  providers: [TldGrabberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
