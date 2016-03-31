import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { GlobalFunctions } from './globals';

export function main() {
  let fn = null;
  let event = {
    preventDefault: () => {},
    stopPropagation: () => {},
    stopImmediatePropagation: () => {}
  };

  describe('Globals', () => {

    beforeEach(function() {
      fn = new GlobalFunctions();
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      spyOn(event, 'stopImmediatePropagation');
    });

    it('has a function called preventEventBubbling', () => {
      expect(fn.preventEventBubbling).toBeDefined();
    });

    it('calls three methods on the event object', () => {
      fn.preventEventBubbling(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.stopImmediatePropagation).toHaveBeenCalled();
    });
  });
}