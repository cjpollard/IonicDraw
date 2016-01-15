import {Page, Storage, SqlStorage, IonicPlatform, NavController, NavParams} from 'ionic/ionic';
import {DataService} from '../data';
import {Note} from '../note';
import "./edit-note.scss";

@Page({
  templateUrl: 'app/edit-note/edit-note.html',
  providers: [DataService]
})
export class EditNotePage {
    constructor(nav: NavController, params: NavParams, dataService: DataService) {
        this.nav = nav;
        this.params = params;
        this.dataService = dataService;
        this.note = {
            id: 1,
            title: "Title goes here",
            data: "Write something..."
        };
    }
    
    save() {
        this.dataService.saveNote(this.note);
    }
}