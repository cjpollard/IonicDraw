import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import {Pipe, PipeTransform} from 'angular2/core';
import {MeasurementPipe} from './measurement.pipe';

export function main() {

  let pipe = null;

  describe('Measurement Pipe', () => {

    beforeEach(() => {
      pipe = new MeasurementPipe();
    });

    it('has a function called transform', () => {
      expect(pipe.transform).toBeDefined();
    });

    it('has a function for converting metric height to imperial height', () => {
      expect(pipe.metricToImperialHeight).toBeDefined();
    });

    it('converts metric to imperial height', () => {
      expect(pipe.metricToImperialHeight("147 cm")).toEqual("4' 10\"");
    });

    it('cuts inches off if inches is 0 or 12', () => {
      expect(pipe.metricToImperialHeight("182 cm")).toEqual("6'");
    });

    it('has a function for converting imperial height to metric height', () => {
      expect(pipe.imperialToMetricHeight).toBeDefined();
    });

    it('converts imperial to metric height', () => {
      expect(pipe.imperialToMetricHeight("4' 10\"")).toEqual("147 cm");
    });

    it('has a function for converting metric weight to imperial weight', () => {
      expect(pipe.metricToImperialWeight).toBeDefined();
    });

    it('converts metric to imperial weight', () => {
      expect(pipe.metricToImperialWeight("65 kg")).toEqual("143 lbs");
    });

    it('has a function for converting imperial weight to metric weight', () => {
      expect(pipe.imperialToMetricWeight).toBeDefined();
    });

    it('converts imperial to metric weight', () => {
      expect(pipe.imperialToMetricWeight("122 lbs")).toEqual("55 kg");
    });

    it('throws back original values if wrong function called', () => {
        expect(pipe.imperialToMetricWeight("55 kg")).toEqual("55 kg");
        expect(pipe.metricToImperialWeight("143 lbs")).toEqual("143 lbs");
        expect(pipe.imperialToMetricHeight("147 cm")).toEqual("147 cm");
        expect(pipe.metricToImperialHeight("4' 10\"")).toEqual("4' 10\"");
    });

    it('can use transform to do any of the above conversions', () => {
        expect(pipe.transform("183 cm", ["imperial"])).toEqual("6'");
        expect(pipe.transform("6'", ["metric"])).toEqual("183 cm");
        expect(pipe.transform("122 lbs", ["metric"])).toEqual("55 kg");
        expect(pipe.transform("65 kg", ["imperial"])).toEqual("143 lbs");
    });

  });
}