/**
 * Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.
 * In order to get the full feature-set of these components, HammerJS must be loaded into the application.
 * Fix for: The "longpress" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.
 * https://material.angular.io/guide/getting-started#step-5-gesture-support
 */
import 'hammerjs';

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
