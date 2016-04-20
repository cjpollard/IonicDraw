import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Platform }   from 'ionic-angular';
import { Http } from 'angular2/http';
import { StatusBar } from 'ionic-native';
import { MyApp }           from './app';
import { DataService } from './services/data.service';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

let myApp = null;

function getComponentStub(name: string): any {
  'use strict';

  let component: any = {
    push: function(): boolean { return true; },
    close: function(root: any): boolean { return true; },
  };
  return component;
}

export function main() {

  describe('MyApp', () => {

    beforeEach(function() {
      let platform = new Platform();
      let app = new IonicApp(null, null, null);
      let dataService = new DataService();

      myApp = new MyApp(app, platform, dataService);
    });

    it('initialises with five possible pages', () => {
      expect(myApp['pages'].length).toEqual(7);
    });

    it('initialises with a root page', () => {
      expect(myApp['rootPage']).not.toBe(null);
    });

    it('initialises with an app', () => {
      expect(myApp['app']).not.toBe(null);
    });

    it('initialises with a data service', () => {
      expect(myApp['dataService']).not.toBe(null);
    });

    it('opens a page', () => {
      spyOn(myApp['app'], 'getComponent').and.callFake(getComponentStub);
      myApp.openPage(myApp['pages'][1]);
      expect(myApp['app'].getComponent).toHaveBeenCalledWith('nav');
    });

    it('runs initialiseApp', () => {
      expect(myApp['initializeApp']).not.toBe(null);
    });
  });
}