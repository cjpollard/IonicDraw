import {Injectable} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Character} from '../character';

@Injectable({
    providers: [HTTP_PROVIDERS]
})
export class CharacterService {
    private charUrl: string = "build/character.data.json";

    constructor(private http: Http) {
    }

    getCharacters() {
        console.log(this.charUrl);
        return this.http.get(this.charUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    handleError(error: Response) {
        return Observable.throw(error.json().error || "Couldn't retrieve characters");
    }
}