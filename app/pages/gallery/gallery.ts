import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {ChangeDetectionStrategy} from 'angular2/core';
import {DataService} from '../../data';
import {DrawPadPage} from '../draw-pad/draw-pad';
import {Note} from '../../note';
import {UniquePipe} from '../../unique.pipe';


@Page({
    templateUrl: 'build/pages/gallery/gallery.html',
    providers: [DataService],
    pipes: [UniquePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryPage {

    private nav: NavController;
    private dataService: DataService;
    private images: any;
    private refresher: any;

    constructor(nav: NavController, dataService: DataService) {
        this.nav = nav;
        this.dataService = dataService;
        this.images = [{ title: "" }];
        this.updateNotes();
    }

    updateNotes(event?: any, refresher?: any) {
        let that = this;
        refresher = typeof refresher !== "undefined" ? refresher : { complete: function() { } };
        this.dataService.getNotes("canvas", (images) => {
            that.images = images;
            refresher.complete();
        });
    }

    onPageDidEnter() {
        this.updateNotes();
    }

    presentConfirm() {
        var that = this;
        var alert = Alert.create({
            title: 'Confirm delete',
            message: 'Are you sure you want to delete all drawings?',
            buttons: [{
                text: 'Nope',
                handler: () => {
                    that.nav.remove(1);
                }
            }, {
                    text: 'Yep',
                    handler: () => {
                        this.dataService.deleteAll('canvas');
                        this.updateNotes();
                        that.nav.remove(1);
                    }
                }]
        });
        this.nav.present(alert);
    }

    addNote() {
        this.nav.push(DrawPadPage);
    }

    editNote(image: Note) {
        this.nav.push(DrawPadPage, {
            id: image.id,
            title: image.title,
            note: image.note
        });
    }

    deleteAllNotes() {
        this.presentConfirm();
    }

    bye() {
        this.dataService.deleteDb();
    }
}