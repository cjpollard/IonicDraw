import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Character} from '../character';

@Injectable()
export class CharacterService {
    private charUrl: string = "build/character.data.json";

    constructor(private http: Http) {
    }

    getCharacters() {
        return this.http.get(this.charUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    handleError(error: Response) {
        return Observable.throw(error.json().error || "Couldn't retrieve characters");
    }
}