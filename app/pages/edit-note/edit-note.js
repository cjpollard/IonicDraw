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
var EditNotePage = (function () {
    function EditNotePage(nav, params, dataService) {
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
    EditNotePage.prototype.save = function () {
        var _this = this;
        this.dataService.saveNote(this.note, function () {
            var that = _this;
            var alert = ionic_1.Alert.create({
                title: 'Note saved',
                message: 'Your note was saved successfully.',
                buttons: [{
                        text: 'Thanks?',
                        handler: function () {
                            that.nav.remove(1);
                            that.nav.pop();
                        }
                    }]
            });
            _this.nav.present(alert);
        }, function (error) {
            var that = _this;
            var alert = ionic_1.Alert.create({
                title: 'Oops',
                message: 'Something happened, maybe you can make sense of this...\n' + JSON.stringify(error) + '\n ... No? Okay, just hit the button to make it go away.',
                buttons: [{
                        text: 'Argh!',
                        handler: function () {
                            that.nav.remove(1);
                        }
                    }]
            });
            _this.nav.present(alert);
        });
    };
    EditNotePage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/edit-note/edit-note.html',
            providers: [data_1.DataService]
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, ionic_1.NavParams, data_1.DataService])
    ], EditNotePage);
    return EditNotePage;
})();
exports.EditNotePage = EditNotePage;
//# sourceMappingURL=edit-note.js.map