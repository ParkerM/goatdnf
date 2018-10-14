import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

/**
 * Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.
 * In order to get the full feature-set of these components, HammerJS must be loaded into the application.
 * https://material.angular.io/guide/getting-started#step-5-gesture-support
 */
import 'hammerjs';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
