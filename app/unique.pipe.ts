import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'unique',
    pure: false
})
export class UniquePipe implements PipeTransform {
    transform(input: any): any {

        if(!Array.isArray(input)) {
            return input;
        }

        var output = [];
        var unique = {};

        for(let item of input) {
            if(!unique[item.id]) {
                output.push(item);
                unique[item.id] = item;
            }
        }

        return output;

    }
}