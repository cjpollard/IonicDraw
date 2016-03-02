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
var draw_pad_1 = require('../draw-pad/draw-pad');
var GalleryPage = (function () {
    function GalleryPage(nav, dataService) {
        this.nav = nav;
        this.dataService = dataService;
        this.images = [{ title: "" }];
        this.updateNotes();
    }
    GalleryPage.prototype.updateNotes = function (event, refresher) {
        var that = this;
        refresher = typeof refresher !== "undefined" ? refresher : { complete: function () { } };
        this.dataService.getNotes("canvas", function (images) {
            that.images = images;
            refresher.complete();
        });
    };
    GalleryPage.prototype.onPageDidEnter = function () {
        this.updateNotes();
    };
    GalleryPage.prototype.presentConfirm = function () {
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
                        _this.dataService.deleteAll('canvas');
                        _this.updateNotes();
                        that.nav.remove(1);
                    }
                }]
        });
        this.nav.present(alert);
    };
    GalleryPage.prototype.addNote = function () {
        this.nav.push(draw_pad_1.DrawPadPage);
    };
    GalleryPage.prototype.editNote = function (image) {
        this.nav.push(draw_pad_1.DrawPadPage, {
            id: image.id,
            title: image.title,
            note: image.note
        });
    };
    GalleryPage.prototype.deleteAllNotes = function () {
        this.presentConfirm();
    };
    GalleryPage.prototype.bye = function () {
        this.dataService.deleteDb();
    };
    GalleryPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/gallery/gallery.html',
            providers: [data_1.DataService]
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, data_1.DataService])
    ], GalleryPage);
    return GalleryPage;
})();
exports.GalleryPage = GalleryPage;
//# sourceMappingURL=gallery.js.map