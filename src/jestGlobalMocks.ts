/**
 * Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.
 * In order to get the full feature-set of these components, HammerJS must be loaded into the application.
 * Fix for: The "longpress" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.
 * https://material.angular.io/guide/getting-started#step-5-gesture-support
 */
import 'hammerjs';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {})
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

// Object.defineProperty(window, 'CSS', {value: null});
// Object.defineProperty(document, 'doctype', {
//   value: '<!DOCTYPE html>'
// });
