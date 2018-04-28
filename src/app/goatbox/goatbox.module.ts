import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TldPair} from '../service/tld-grabber.service';
import {MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule
  ],
  declarations: []
})
export class GoatboxModule {
  private tld: TldPair;
  private response: Response;

  public constructor() {

  }

  protected getGoat(): Response {
    return null;
  }
}
