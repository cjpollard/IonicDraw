import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { Platform, Storage, SqlStorage } from 'ionic-framework/ionic';
import { DataService } from '../app/data';
import { Note } from '../app/note';

export function main() {
  let service = null;

  function mockSqlQuery(query) {

  }

  describe('DataService', () => {

    beforeEach(function() {
      let platform = new Platform();
      service = new DataService(platform);
    });

    it('has some storage', () => {
      expect(service['storage']).not.toBe(null);
    });
    it('has a database', () => {
      expect(service['db']).not.toBe(null);
    });
  });
}