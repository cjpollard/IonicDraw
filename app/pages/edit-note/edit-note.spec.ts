import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { IonicApp, Page, NavController, NavParams }   from 'ionic-angular';
import { EditNotePage }           from './edit-note';
import { DataService } from '../../services/data.service';
import { Note } from '../../note';

let page = null;
let service = null;
let params = {id: 0, title: "title", note: "note"};

export function main() {

  describe('EditNote', () => {

    beforeEach(function() {
      service = new DataService();
      let navParams = new NavParams(params);
      page = new EditNotePage(null, navParams, service);
      spyOn(service, 'saveNote');
    });

    it('initialises with correct parameters', () => {
      expect(page).not.toBe(null);
      expect(page['params']).toEqual({id: 0, title: "title", note: "note"});
    });

    it('has a correct note from the nav parameters', () => {
      expect(page['note']).toEqual({id: 0, title: "title", note: "note", type: "note"});
    });

    it('save makes a call to DataService', () => {
      page.save();
      expect(service['saveNote']).toHaveBeenCalled();
    });

  });
}