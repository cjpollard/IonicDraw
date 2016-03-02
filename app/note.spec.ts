import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { Note } from '../app/note';

export function main() {
  let note = null;

  describe('Note', () => {

    beforeEach(function() {
      note = new Note(0, "title", "note", "note");
    });

    it('has four parameters', () => {
      expect(note['id']).toEqual(0);
      expect(note['title']).toEqual("title");
      expect(note['note']).toEqual("note");
      expect(note['type']).toEqual("note");
    });
  });
}