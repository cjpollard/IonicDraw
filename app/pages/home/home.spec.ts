import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, Platform }   from 'ionic-framework/ionic';
import { HomePage }           from './home';
import { DrawPadPage } from '../draw-pad/draw-pad';

let nav: NavController;
let page = null;

export function main() {

  describe('Home', () => {

    beforeEach(function() {
      let platform = new Platform();
      page = new HomePage(nav, platform);
      nav = page['nav'];
      spyOn(nav, 'push').and.callFake(DrawPadPage);
    });

    it('initialises with three functions', () => {
      expect(page['clearPicture']).toBeDefined();
      expect(page['takePicture']).toBeDefined();
      expect(page['pushPicture']).toBeDefined();
    });

    it('pushPicture takes us to the draw pad page', () => {
      page.pushPicture();
      expect(DrawPadPage).not.toBe(null);
    });

  });
}