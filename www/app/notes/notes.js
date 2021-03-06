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
        this.notes = [{title: "", note: ""}];
        this.updateNotes();
    }
    
    updateNotes() {
        let that = this;
        this.dataService.getNotes((notes) => {
            that.notes = notes;
        });        
    }
    
    onPageDidEnter() {
        this.updateNotes();
    }
    
    addNote() {
        this.nav.push(EditNotePage);
    }
    
    editNote(note) {
        this.nav.push(EditNotePage, {
            id: note.id,
            title: note.title,
            note: note.note
        });
    }
    
    deleteAllNotes() {
        // todo - add warning
        this.dataService.deleteAll();
        this.updateNotes();
    }
}