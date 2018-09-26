import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCommonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {GoatboxComponent} from './goatbox.component';
import {GoatformComponent} from './goatform/goatform.component';
import {TldGrabberService} from './shared/tld-grabber.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoatfinderService} from './shared/goatfinder.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  exports: [
    GoatboxComponent,
    GoatformComponent,
  ],
  declarations: [
    GoatboxComponent,
    GoatformComponent,
  ],
  providers: [
    GoatfinderService,
    TldGrabberService,
  ],
})
export class GoatboxModule { }
