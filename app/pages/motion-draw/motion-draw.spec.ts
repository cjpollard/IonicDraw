import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, NavParams, Platform }   from 'ionic-framework/ionic';
import { MotionDrawPage }           from './motion-draw';
import { GlobalFunctions } from '../../globals';

let page = null;
let fn = null;

export function main() {

  describe('MotionDraw', () => {

    beforeEach(function() {
      fn = new GlobalFunctions();
      let platform = new Platform();
      page = new MotionDrawPage(null, fn, platform);
    });

    it('initialises with correct parameters', () => {
      expect(page).not.toBe(null);
    });

  });
}