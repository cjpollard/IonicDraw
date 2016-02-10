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
        this.searchQuery = '';
    }
    
    updateNotes() {
        let that = this;
        this.dataService.getNotes("note", (notes) => {
            that.notes = notes;
        });        
    }
    
    getNotes(searchbar) {
        var q = searchbar.value;
        if(q.trim() === '') {
            return;
        }
        
        this.notes = this.notes.filter((v) => {
            if(v.title.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.note.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
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
    
    editNote(note: Object) {
        this.nav.push(EditNotePage, {
            id: note.id,
            title: note.title,
            note: note.note
        });
    }
    
    deleteAllNotes() {
        this.presentConfirm();
    }
    
    bye() {
        this.dataService.deleteDb();
    }
}