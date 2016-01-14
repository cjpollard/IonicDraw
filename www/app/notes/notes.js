import {Page, Storage, SqlStorage, IonicPlatform} from 'ionic/ionic';
import "./notes.scss";

@Page({
  templateUrl: 'app/notes/notes.html'
})
export class NotesPage {
    constructor() {
        this.storage = new Storage(SqlStorage);
    }
    
    setName(name) {
        this.storage.set('name', name);
    }
    
    getName() {
        this.storage.get('name').then(name => {
            
        });
    }
    
    getNotes() {
        return this.notes;
    }
    
    public notes = [{
            title: "Title 1",
            data: "Note 1"
        },{
            title: "Title 2",
            data: "Note 2"
        },{
            title: "Title 3",
            data: "Note 3"
        }
    ]
}