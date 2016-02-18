import {Component} from 'angular2/core';

@Component()
export class Note {
    constructor(
        public id: number,
        public title: string,
        public note: string,
        public type: string
    ) {
        
    }
}