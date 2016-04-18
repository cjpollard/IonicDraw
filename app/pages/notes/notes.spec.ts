import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, Platform, NavController }   from 'ionic-angular';
import { NgZone } from 'angular2/core';
import { NotesPage }           from './notes';
import { DataService } from '../../services/data.service';

let page = null;
let service = null;
let zone = null;

export function main() {

  describe('Notes', () => {

    beforeEach(function() {
      service = new DataService();
      zone = NgZone;
      let platform = new Platform();
      page = new NotesPage(null, platform, service, zone);
      let returnPromise = new Promise((resolve, reject) => {
        resolve([]);
      });
      spyOn(service, 'deleteDb');
      spyOn(service, 'getNotes').and.returnValue(returnPromise);
    });

    it('initialises the page', () => {
      expect(page).not.toBe(null);
    });

    it('updateNotes makes a call to DataService', () => {
      page.updateNotes();
      expect(service['getNotes']).toHaveBeenCalled();
    });

    it('onPageWillEnter makes a call to DataService', () => {
      page.onPageWillEnter();
      expect(service['getNotes']).toHaveBeenCalled();
    });

    it('bye makes a call to DataService', () => {
      page.bye();
      expect(service['deleteDb']).toHaveBeenCalled();
    });

  });
}