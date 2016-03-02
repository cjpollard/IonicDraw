import {App, IonicApp, Platform} from 'ionic-framework/ionic';

export class GlobalFunctions {
  preventEventBubbling(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  };
}