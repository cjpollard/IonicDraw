import {Page, Storage, SqlStorage, NavController, NavParams, Alert} from 'ionic-framework/ionic';
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
            var that = this;
            let alert = Alert.create({
                title: 'Note saved',
                message: 'Your note was saved successfully.',
                buttons: [{
                    text: 'Thanks?',
                    handler: () => {
                        that.nav.remove(1);
                        that.nav.pop();
                    }
                }]
            });
            this.nav.present(alert);
        }, (error: any) => {
            var that = this;
            let alert = Alert.create({
                title: 'Oops',
                message: 'Something happened, maybe you can make sense of this...\n' + JSON.stringify(error) + '\n ... No? Okay, just hit the button to make it go away.',
                buttons: [{
                    text: 'Argh!',
                    handler: () => {
                        that.nav.remove(1);
                    }
                }]
            });
            this.nav.present(alert);
        });
    }
}