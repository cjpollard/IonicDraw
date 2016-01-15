import {Storage, SqlStorage} from 'ionic/ionic';
import {Injectable} from 'angular2/core';

@Injectable()
export class DataService {
    constructor(){
        this.storage = new Storage(SqlStorage, {name: 'notes'});
        this.data = null;
        
        this.storage.get('notes').then((notes) => {
            this.data = JSON.parse(notes);
        });
    }
    
    getNotes() {
        return this.data;
    }
    
    saveNote(note) {
        if(!this.data) {
            this.data = [note];
            let newNote = JSON.stringify(note);
            this.storage.set('notes', newNote);
        } else {
            this.data.push(note);
            let newNote = JSON.stringify(this.data);
            this.storage.set('notes', newNote);
        }
    }
    
    deleteAll() {
        this.storage.query('notes', 'drop notes');
    }
}