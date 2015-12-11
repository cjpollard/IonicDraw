import {App, IonicApp, Platform} from 'ionic/ionic';

export class GlobalFunctions {
  preventEventBubbling(event) {    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  };
}