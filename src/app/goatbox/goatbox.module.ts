import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {GoatboxComponent} from './goatbox.component';
import {TldGrabberService} from '../service/tld-grabber.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  exports: [
    GoatboxComponent
  ],
  declarations: [
    GoatboxComponent
  ],
  providers: [TldGrabberService],
})
export class GoatboxModule { }
