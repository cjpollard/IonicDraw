import {Page, NavController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Character} from '../../character';
import {CharacterDetailsPage} from '../character-details/character-details';

@Page({
  templateUrl: 'build/pages/character-list/character-list.html',
  providers: [HTTP_PROVIDERS]
})
export class CharacterListPage {
  public characters: Array<Character>;

  constructor(public nav: NavController, private http: Http) {
    this.nav = nav;
    this.init();
  }

  init(): void {
    this.getChars();
  }

  getChars() {
    this.http.get("build/character.data.json")
              .map(res => res.json())
              .subscribe((chars) => {
                this.characters = chars;
              }, error => this.handleError(error));
  }

  loadChar(char): void {
    this.nav.push(CharacterDetailsPage, {char: char});
  }

  handleError(error: Response) {
    return Observable.throw(error.json().error || "Something happened");
  }
}
