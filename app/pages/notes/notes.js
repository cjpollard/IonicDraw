var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_1 = require('ionic-framework/ionic');
var data_1 = require('../../data');
var edit_note_1 = require('../edit-note/edit-note');
var NotesPage = (function () {
    function NotesPage(nav, dataService) {
        this.nav = nav;
        this.dataService = dataService;
        this.notes = [{ id: 0, title: "", note: "", type: "note" }];
        this.updateNotes();
        this.searchQuery = '';
    }
    NotesPage.prototype.updateNotes = function (event, refresher) {
        var that = this;
        refresher = typeof refresher !== "undefined" ? refresher : { complete: function () { } };
        this.dataService.getNotes("note", function (notes) {
            that.notes = notes;
            refresher.complete();
        });
    };
    NotesPage.prototype.getNotes = function (searchbar) {
        var q = searchbar.value;
        if (q.trim() === '') {
            return;
        }
        this.notes = this.notes.filter(function (v) {
            if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.note.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
    };
    NotesPage.prototype.onPageDidEnter = function () {
        this.updateNotes();
    };
    NotesPage.prototype.presentConfirm = function () {
        var _this = this;
        var that = this;
        var alert = ionic_1.Alert.create({
            title: 'Confirm delete',
            message: 'Are you sure you want to delete all notes?',
            buttons: [{
                    text: 'Nope',
                    handler: function () {
                        that.nav.remove(1);
                    }
                }, {
                    text: 'Yep',
                    handler: function () {
                        _this.dataService.deleteAll("note");
                        _this.updateNotes();
                        that.nav.remove(1);
                    }
                }]
        });
        this.nav.present(alert);
    };
    NotesPage.prototype.addNote = function () {
        this.nav.push(edit_note_1.EditNotePage);
    };
    NotesPage.prototype.editNote = function (note) {
        this.nav.push(edit_note_1.EditNotePage, {
            id: note.id,
            title: note.title,
            note: note.note
        });
    };
    NotesPage.prototype.deleteAllNotes = function () {
        this.presentConfirm();
    };
    NotesPage.prototype.bye = function () {
        this.dataService.deleteDb();
    };
    NotesPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/notes/notes.html',
            providers: [data_1.DataService]
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, data_1.DataService])
    ], NotesPage);
    return NotesPage;
})();
exports.NotesPage = NotesPage;
//# sourceMappingURL=notes.js.map