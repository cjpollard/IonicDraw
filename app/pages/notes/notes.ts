import {ChangeDetectionStrategy} from 'angular2/core';
import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {DataService} from '../../data';
import {EditNotePage} from '../edit-note/edit-note';
import {Note} from '../../note';
import {OrderBy} from '../../orderBy.pipe';


@Page({
    templateUrl: 'build/pages/notes/notes.html',
    providers: [DataService],
    pipes: [OrderBy],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPage {
    private nav: NavController;
    private dataService: DataService;
    private notes: Array<Note>;
    private searchQuery: string;
    private filter: string;

    constructor(nav: NavController, dataService: DataService) {
        this.nav = nav;
        this.dataService = dataService;
        this.notes = [{ id: 0, title: "", note: "", type: "note" }];
        this.updateNotes();
        this.searchQuery = "";
        this.filter = "+title";
    }

    updateNotes(event?: any, refresher?: any) {
        let that = this;
        refresher = typeof refresher !== "undefined" ? refresher : { complete: function() { } };
        this.dataService.getNotes("note", (notes: Array<Note>) => {
            that.notes = notes;
            refresher.complete();
        });
    }

    filterNotes(searchbar) {
        var q = searchbar.value;
        if (q.trim() === "") {
            return;
        }

        this.notes = this.notes.filter((v) => {
            if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.note.toLowerCase().indexOf(q.toLowerCase()) > -1) {
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
            }, {
                    text: 'Yep',
                    handler: () => {
                        this.dataService.deleteAll("note");
                        this.updateNotes();
                        that.nav.remove(1);
                    }
                }]
        });
        this.nav.present(alert);
    }

    addNote() {
        this.nav.push(EditNotePage, {
            id: 0,
            title: "",
            note: ""
        });
    }

    editNote(note: Note) {
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