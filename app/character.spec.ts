import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { Character } from './character';

export function main() {
  let char = null;

  describe('Character', () => {

    beforeEach(function() {
      char = new Character("Person",
      {
        height: "150 cm",
        weight: "50 kg",
        eyes: "grey",
        hair: "grey"
      },
      {
          bio: ""
      });
    });

    it('has four parameters', () => {
      let characteristics = {
        height: "150 cm",
        weight: "50 kg",
        eyes: "grey",
        hair: "grey"
      };
      let biography = {
          bio: ""
      };
      expect(char['name']).toEqual("Person");
      expect(char['characteristics']).toEqual(characteristics);
      expect(char['biography']).toEqual(biography);
    });
  });
}