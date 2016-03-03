import {Platform, Storage, SqlStorage} from 'ionic-framework/ionic';
import {Injectable} from 'angular2/core';
import {Note} from './note';

@Injectable()
export class DataService {
    // todo - extend for use with canvas pages
    private platform: Platform;
    private storage: any;
    private notes: any;

    constructor(platform: Platform){
        this.platform = platform;
        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
            this.initDb();
        });
        this.notes = null;
    }

    initDb() {
        this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT CHECK(title != "undefined"), note TEXT CHECK(note != "undefined"), type TEXT)').then((tx) => {
            console.log(JSON.stringify(tx.res));
        });
    }

    getNotes(type: string, callback: (notes: any) => void) {
        this.platform.ready().then(() => {
            this.storage.query("SELECT * FROM notes WHERE type='" + type + "'").then((tx) => {
                this.notes = [];
                let success = tx.res;
                if(success && success.rows.length > 0) {
                    for(var i = 0; i < success.rows.length; i++) {
                        this.notes.push({id: success.rows.item(i).id,title: decodeURIComponent(success.rows.item(i).title), note: decodeURIComponent(success.rows.item(i).note)});
                    }
                }
                callback(this.notes);
            });
        });
    }

    saveNote(note: Note, successCb, errorCb) {
        if(note instanceof Note) {
            console.log("This is an actual note!");
        }
        function fixedEncodeURIComponent (str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
        note.title = fixedEncodeURIComponent(note.title);
        note.note = fixedEncodeURIComponent(note.note);
        var query = note.id !== 0 ? "UPDATE notes SET title='" + note.title + "', note='" + note.note + "', type='" + note.type + "' WHERE id=" + note.id
                            : "INSERT INTO notes (title, note, type) VALUES ('" + note.title + "', '" + note.note + "', '" + note.type + "')";
        this.storage.query(query).then((tx) => {
            if(tx.res) {
                successCb();
            } else {
                errorCb(tx.err);
            }
        });
    }

    deleteAll(type: string) {
        this.storage.query("DELETE FROM notes").then((tx) => {
           console.log('deleted stuff');
        });
    }

    deleteDb() {
        this.storage.query("DROP TABLE notes").then((tx) => {
           console.log('deleted all the things');
        });
    }
}