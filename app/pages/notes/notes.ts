import {Platform, Page, NavController, Alert} from 'ionic-angular';
import {ChangeDetectionStrategy, NgZone} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {EditNotePage} from '../edit-note/edit-note';
import {Note} from '../../note';
import {UniquePipe} from '../../pipes/unique.pipe';


@Page({
    templateUrl: 'build/pages/notes/notes.html',
    providers: [DataService],
    pipes: [UniquePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPage {
    private nav: NavController;
    private dataService: DataService;
    public notes: Note[];
    private searchQuery: string;
    private platform: Platform;
    private zone: NgZone;

    constructor(nav: NavController, platform: Platform, dataService: DataService, zone: NgZone) {
        this.nav = nav;
        this.platform = platform;
        this.dataService = dataService;
        this.zone = zone;
        this.notes = [];
        this.updateNotes();
        this.searchQuery = "";
    }

    updateNotes(refresher?: any) {
        refresher = typeof refresher !== "undefined" ? refresher : { complete: function() { } };
        this.dataService.getNotes("note").then((notes: Note[]) => {
            this.zone.run(() => {
                this.notes = notes;
                refresher.complete();
            });
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

    onPageWillEnter() {
        return this.updateNotes();
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