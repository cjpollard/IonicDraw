import {Page, IonicPlatform, NavController} from 'ionic/ionic';
import {DataService} from '../data';
import {EditNotePage} from '../edit-note/edit-note';

import "./notes.scss";
@Page({
  templateUrl: 'app/notes/notes.html',
  providers: [DataService]
})
export class NotesPage {
    constructor(nav: NavController, dataService: DataService) {
        this.nav = nav;
        this.dataService = dataService;
        this.notes = this.dataService.getNotes() || [];
    }
    
    getNotes() {
        return this.notes;
    }
    
    addNote() {
        this.nav.push(EditNotePage);
    }
    
    editNote(note) {
        this.nav.push(EditNotePage, {
            note: note
        });
    }
    
    deleteAllNotes() {
        this.dataService.deleteAll();
    }
}