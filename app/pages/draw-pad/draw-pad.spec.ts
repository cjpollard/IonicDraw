import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, NavParams, Platform }   from 'ionic-framework/ionic';
import { DrawPadPage }           from './draw-pad';
import { DataService } from '../../data';
import { GlobalFunctions } from '../../globals';

let page = null;
let service = null;
let params = {id: 0, title: "title", note: "note"};
let fn = null;

export function main() {

  describe('DrawPad', () => {

    beforeEach(function() {
      service = new DataService();
      fn = new GlobalFunctions();
      let navParams = new NavParams(params);
      let platform = new Platform();
      page = new DrawPadPage(null, fn, navParams, service, platform);
      spyOn(service, 'saveNote');
      page['canvas'] = {toDataURL: () => {
        return "this://is.a.fake.url";
        }
      };
    });

    it('initialises with correct parameters', () => {
      expect(page).not.toBe(null);
    });

    it('save makes a call to DataService', () => {
      spyOn(page, 'getTitle').and.callFake((callback) => { callback("title"); });
      page.saveCanvas();
      expect(service['saveNote']).toHaveBeenCalled();
    });

    it('can change colour of brush', () => {
      let colourBtn = { classList: ['button-assertive'], setAttribute: (attr, value) => {}};
      spyOn(document, 'getElementById').and.returnValue(colourBtn);
      expect(page['currentColour']).toEqual('black');
      expect(page['buttonColour']).toEqual('dark');
      page.changeColour();
      expect(page['currentColour']).toEqual('green');
      expect(page['buttonColour']).toEqual('secondary');
    });

  });
}