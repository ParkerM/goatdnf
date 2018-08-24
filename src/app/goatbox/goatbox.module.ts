import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatExpansionModule, MatListModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {GoatboxComponent} from './goatbox.component';
import {TldGrabberService} from '../service/tld-grabber.service';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
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
