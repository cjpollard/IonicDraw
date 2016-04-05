import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import {Pipe, PipeTransform} from 'angular2/core';
import {UniquePipe} from './unique.pipe';

export function main() {

  let pipe = null;

  describe('Unique Pipe', () => {

    beforeEach(() => {
      pipe = new UniquePipe();
    });

    it('has a function called transform', () => {
      expect(pipe.transform).toBeDefined();
    });

    it('transform returns the input if not an array', () => {
      let input = 0;
      expect(pipe.transform(input)).toEqual(input);
    });

    it('transform removes non-unique values from an array', () => {
      let input = [{id: 0}, {id: 0}];
      expect(pipe.transform(input).length).toEqual(1);
    });

  });
}