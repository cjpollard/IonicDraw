import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController }   from 'ionic-framework/ionic';
import { GalleryPage }           from './gallery';
import { DataService } from '../../data';

let page = null;
let service = null;

export function main() {

  describe('Gallery', () => {

    beforeEach(function() {
      service = new DataService();
      page = new GalleryPage(null, service);
      spyOn(service, 'deleteDb');
      spyOn(service, 'getNotes');
    });

    it('initialises the page', () => {
      expect(page).not.toBe(null);
    });

    it('updateNotes makes a call to DataService', () => {
      page.updateNotes();
      expect(service['getNotes']).toHaveBeenCalled();
    });

    it('onPageDidEnter makes a call to DataService', () => {
      page.onPageDidEnter();
      expect(service['getNotes']).toHaveBeenCalled();
    });

    it('bye makes a call to DataService', () => {
      page.bye();
      expect(service['deleteDb']).toHaveBeenCalled();
    });

  });
}