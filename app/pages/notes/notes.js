import {Page, IonicPlatform, NavController, Alert} from 'ionic/ionic';
import {DataService} from '../../data';
import {EditNotePage} from '../edit-note/edit-note';


@Page({
  templateUrl: 'build/pages/notes/notes.html',
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
    
    presentConfirm() {
        var that = this;
        var alert = Alert.create({
           title: 'Confirm delete',
           message: 'Are you sure you want to delete all notes?',
           buttons: [{
               text: 'Nope',
               handler: () => {
                   that.nav.remove(1);
               }
           },{
               text: 'Yep',
               handler: () => {
                   this.dataService.deleteAll();
                   this.updateNotes();  
                   that.nav.remove(1);       
               }
           }] 
        });
        this.nav.present(alert);
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
        this.presentConfirm();
    }
}