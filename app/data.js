import {Platform, Storage, SqlStorage} from 'ionic/ionic';
import {Injectable} from 'angular2/core';

@Injectable()
export class DataService {
    // todo - extend for use with canvas pages
    constructor(platform: Platform){
        this.platform = platform;
        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
            this.db = this.storage._strategy._db;
            this.db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT, type TEXT)', [], (tx, success) => {
                    console.log("Success: " + JSON.stringify(success));    
                }, (tx, error) => {
                    console.log("ERROR");
                });  
            });                            
        });
        this.notes = null;
    }
    
    getNotes(type: string, callback) {
        this.platform.ready().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM notes WHERE type='" + type + "'", [], (tx, success) => {
                    this.notes = [];
                    if(success && success.rows.length > 0) {
                        for(var i = 0; i < success.rows.length; i++) {
                            this.notes.push({id: success.rows.item(i).id,title: success.rows.item(i).title, note: success.rows.item(i).note});
                        }
                    }
                    callback(this.notes);
                }, (tx, error) => {
                    console.log("ERROR -> " + JSON.stringify(error));
                    callback({title: "Error", note: "Could not retrieve notes"});
                });
            });
        });
    }
    
    saveNote(note) {
        var query = note.id ? "UPDATE notes SET title='" + note.title + "', note='" + note.note + "', type='" + note.type + "' WHERE id=" + note.id
                            : "INSERT INTO notes (title, note, type) VALUES ('" + note.title + "', '" + note.note + "', '" + note.type + "')";
        this.db.transaction((tx) => {
            tx.executeSql(query, [], (tx, success) => {
                console.log(JSON.stringify(success));
            }, (tx, error) => {
                console.log("ERROR -> " + JSON.stringify(error));
            });
        });        
    }
    
    deleteAll() {
        this.db.transaction((tx) => {
            tx.executeSql("DELETE FROM notes", [], (tx, success) => {
                console.log(JSON.stringify(success));
            }, (tx, error) => {
                console.log("ERROR -> " + JSON.stringify(error));
            });
        });
    }
}