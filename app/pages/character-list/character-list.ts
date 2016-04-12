import {Page, NavController} from 'ionic-angular';
import {Character} from '../../character';
import {CharacterDetailsPage} from '../character-details/character-details';

@Page({
  templateUrl: 'build/pages/character-list/character-list.html',
})
export class CharacterListPage {
  public characters: Array<Character>;

  constructor(public nav: NavController) {
    this.nav = nav;
    this.init();
  }

  init(): void {
    this.characters = [
      {
        name: "Luiril",
        characteristics: {
          height: "5' 0\"",
          weight: "108 lbs",
          eyes: "Green",
          hair: "Brown"
        },
        biography: {}
      },
      {
        name: "Alrim",
        characteristics: {
          height: "5' 6\"",
          weight: "130 lbs",
          eyes: "Blue",
          hair: "Brown"
        },
        biography: {}
      }
    ];
  }

  loadChar(char): void {
    this.nav.push(CharacterDetailsPage, {char: char});
  }
}
