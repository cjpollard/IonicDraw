import {Page, Storage, SqlStorage, NavController, NavParams, Alert} from 'ionic-angular';
import {DataService} from '../../data';
import {NotesPage} from '../notes/notes';
import {Note} from '../../note';


@Page({
    templateUrl: 'build/pages/edit-note/edit-note.html',
    providers: [DataService]
})
export class EditNotePage {
    private nav: NavController;
    private params: Note;
    private dataService: DataService;
    private note: Note;
    constructor(nav: NavController, params: NavParams, dataService: DataService) {
        this.nav = nav;
        this.params = params.data;
        this.dataService = dataService;
        this.note = {
            id: this.params.id,
            title: this.params.title,
            note: this.params.note,
            type: "note"
        };
    }

    save() {
        this.dataService.saveNote(this.note, () => {
            let alert = Alert.create({
                title: 'Note saved',
                message: 'Your note was saved successfully.',
                buttons: [{
                    text: 'Thanks?',
                    handler: () => {
                        this.nav.remove().then(() => {
                            this.nav.pop();
                        });
                    }
                }]
            });
            this.nav.present(alert);
        }, (error: any) => {
            let alert = Alert.create({
                title: 'Oops',
                message: 'Something happened, maybe you can make sense of this...\n' + JSON.stringify(error) + '\n ... No? Okay, just hit the button to make it go away.',
                buttons: [{
                    text: 'Argh!',
                    handler: () => {
                        this.nav.pop();
                    }
                }]
            });
            this.nav.present(alert);
        });
    }
}