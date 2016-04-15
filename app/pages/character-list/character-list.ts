import {Page, NavController} from 'ionic-angular';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Character} from '../../character';
import {CharacterService} from '../../services/character.service';
import {CharacterDetailsPage} from '../character-details/character-details';

@Page({
  templateUrl: 'build/pages/character-list/character-list.html',
  providers: [CharacterService]
})
export class CharacterListPage {
  public characters: Array<Character>;

  constructor(public nav: NavController, private characterService: CharacterService) {
    this.nav = nav;
    this.characterService = characterService;
    this.init();
  }

  init(): void {
    this.getChars();
  }

  getChars() {
    this.characterService.getCharacters()
              .subscribe((chars) => {
                this.characters = chars;
              }, error => this.handleError(error));
  }

  loadChar(char): void {
    this.nav.push(CharacterDetailsPage, {char: char});
  }

  handleError(error: Response) {
        return Observable.throw(error.json().error || "Couldn't retrieve characters");
    }
}
