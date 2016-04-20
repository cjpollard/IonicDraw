import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, Platform }   from 'ionic-angular';
import { MapPage }           from './map';

let page = null;
let platform = null;

let mockGoogleMapsApi = {
    maps: {
        StyledMapType: () => {},
        Map: () => {},
        LatLng: () => {},
        MapTypeId: () => {}
    }
};

export function main() {

  describe('Home', () => {

    beforeEach(function() {
      platform = new Platform();
      window["google"] = mockGoogleMapsApi;
      page = new MapPage(null, platform);
    });

    it('initialises with three functions', () => {
      expect(page['loadMap']).toBeDefined();
      expect(page['loadMapsApi']).toBeDefined();
      expect(page['initialiseMap']).toBeDefined();
    });

    it('initialiseMap checks platform is ready', () => {
      spyOn(platform, "ready").and.returnValue(new Promise(() => {}));
      page.initialiseMap();
      expect(platform.ready).toHaveBeenCalled();
    });

    it('loadMapsApi imports the Google maps api', () => {
      page.loadMapsApi();
      expect(document.getElementById('map-api')).not.toBeNull();
    });

    it('load map gets current position', () => {
      spyOn(window.navigator.geolocation, "getCurrentPosition");
      page.loadMap();
      expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });
}