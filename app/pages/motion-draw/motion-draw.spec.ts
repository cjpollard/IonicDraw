import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, NavParams, Platform }   from 'ionic-angular';
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
      page.context = {clearRect: () => {}, getImageData: () => {}, putImageData: () => {}};
    });

    it('initialises with correct parameters', () => {
      expect(page).not.toBe(null);
    });

    it('clear, load and save functions all call stop', () => {
      spyOn(page, 'stop');
      page.clearCanvas();
      expect(page['stop']).toHaveBeenCalledTimes(1);
      page.saveCanvas();
      expect(page['stop']).toHaveBeenCalledTimes(2);
      page.loadCanvas();
      expect(page['stop']).toHaveBeenCalledTimes(3);
    });

  });
}