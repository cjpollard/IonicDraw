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
var core_1 = require('angular2/core');
var note_1 = require('./note');
var DataService = (function () {
    function DataService(platform) {
        var _this = this;
        this.platform = platform;
        this.platform.ready().then(function () {
            _this.storage = new ionic_1.Storage(ionic_1.SqlStorage);
            _this.initDb();
        });
        this.notes = null;
    }
    DataService.prototype.initDb = function () {
        this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT CHECK(title != "undefined"), note TEXT CHECK(note != "undefined"), type TEXT)').then(function (tx) {
            console.log(JSON.stringify(tx.res));
        });
    };
    DataService.prototype.getNotes = function (type, callback) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.storage.query("SELECT * FROM notes WHERE type='" + type + "'").then(function (tx) {
                _this.notes = [];
                var success = tx.res;
                if (success && success.rows.length > 0) {
                    for (var i = 0; i < success.rows.length; i++) {
                        _this.notes.push({ id: success.rows.item(i).id, title: decodeURIComponent(success.rows.item(i).title), note: decodeURIComponent(success.rows.item(i).note) });
                    }
                }
                callback(_this.notes);
            });
        });
    };
    DataService.prototype.saveNote = function (note, successCb, errorCb) {
        if (note instanceof note_1.Note) {
            console.log("This is an actual note!");
        }
        function fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
        note.title = fixedEncodeURIComponent(note.title);
        note.note = fixedEncodeURIComponent(note.note);
        var query = note.id !== 0 ? "UPDATE notes SET title='" + note.title + "', note='" + note.note + "', type='" + note.type + "' WHERE id=" + note.id
            : "INSERT INTO notes (title, note, type) VALUES ('" + note.title + "', '" + note.note + "', '" + note.type + "')";
        this.storage.query(query).then(function (tx) {
            if (tx.res) {
                successCb();
            }
            else {
                errorCb(tx.err);
            }
        });
    };
    DataService.prototype.deleteAll = function (type) {
        this.storage.query("DELETE FROM notes").then(function (tx) {
            console.log('deleted stuff');
        });
    };
    DataService.prototype.deleteDb = function () {
        this.storage.query("DROP TABLE notes").then(function (tx) {
            console.log('deleted all the things');
        });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_1.Platform])
    ], DataService);
    return DataService;
})();
exports.DataService = DataService;
//# sourceMappingURL=data.js.map