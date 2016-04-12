import {Pipe} from 'angular2/core';

@Pipe({
    name: 'measurement'
})
export class MeasurementPipe {
    transform(input: string, args: Array<any>): string {

        let type = input.indexOf("kg") || input.indexOf("lbs") ? "weight" : "height";
        let unit = args[0];

        if(type === "height") {
            if(unit === "metric") {
                return input;
            }
            if(unit === "imperial") {
                return input;
            }
        }
        if(type === "weight") {
            if(unit === "metric") {
                return input;
            }
            if(unit === "imperial") {
                return input;
            }
        }
        return input;

    }
}