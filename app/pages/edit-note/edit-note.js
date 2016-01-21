import {Page, Storage, SqlStorage, IonicPlatform, NavController, NavParams} from 'ionic/ionic';
import {DataService} from '../../data';
import {NotesPage} from '../notes/notes';


@Page({
  templateUrl: 'build/pages/edit-note/edit-note.html',
  providers: [DataService]
})
export class EditNotePage {
    constructor(nav: NavController, params: NavParams, dataService: DataService) {
        this.nav = nav;
        this.params = params.data;
        this.dataService = dataService;
        this.note = {
            id: this.params.id,
            title: this.params.title,
            note: this.params.note
        };
    }
    
    save() {
        this.dataService.saveNote(this.note);
        this.nav.pop();
    }
}