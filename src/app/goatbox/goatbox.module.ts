import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCommonModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {GoatboxComponent} from './goatbox.component';
import {GoatformComponent} from './goatform/goatform.component';
import {TldGrabberService} from './shared/tld-grabber.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms/';
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
export class GoatboxModule {
}
