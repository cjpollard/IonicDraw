import {Pipe} from 'angular2/core';

@Pipe({
    name: 'measurement',
    pure: false
})
export class MeasurementPipe {
    metricToImperialHeight(input: string): string {
        if(input.indexOf("'") !== -1) return input;
        let cms = parseInt(input.split(" ")[0], 10);
        let inches = cms/2.54;
        let feet = Math.floor(inches/12);
        let remainingInches = Math.round(inches%12);
        feet = remainingInches === 12 ? feet + 1 : feet;
        let roundRemainingInches = remainingInches === 12 ? 0 : remainingInches;
        return roundRemainingInches === 0 ? feet + "'" : feet + "' " + remainingInches + "\"";
    }

    imperialToMetricHeight(input: string): string {
        if(input.indexOf("cm") !== -1) return input;
        let inches = 0;
        if(input.indexOf(" ") !== -1) {
            let feetInches = input.split(" ");
            let feet = parseInt(feetInches[0], 10)*12;
            inches = feet + parseInt(feetInches[1], 10);
        } else {
            inches = parseInt(input, 10)*12;
        }
        let cms = Math.round(inches*2.54);
        return cms + " cm";
    }

    metricToImperialWeight(input: string): string {
        if(input.indexOf("lbs") !== -1) return input;
        let kg = parseInt(input.split(" ")[0], 10);
        let lbs = kg*2.2;
        return lbs + " lbs";
    }

    imperialToMetricWeight(input: string): string {
        if(input.indexOf("kg") !== -1) return input;
        let lbs = parseInt(input.split(" ")[0], 10);
        let kg = Math.round(lbs/2.2);
        return kg + " kg";
    }

    transform(input: string, args: Array<any>): string {
        if(!args) return input;
        let type = input.indexOf("kg") !== -1 || input.indexOf("lbs") !== -1 ? "weight" : "height";
        let unit = args[0];

        if(type === "height") {
            if(unit === "metric") {
                return this.imperialToMetricHeight(input);
            }
            if(unit === "imperial") {
                return this.metricToImperialHeight(input);
            }
        }
        if(type === "weight") {
            if(unit === "metric") {
                return this.imperialToMetricWeight(input);
            }
            if(unit === "imperial") {
                return this.metricToImperialWeight(input);
            }
        }
        return input;
    }
}