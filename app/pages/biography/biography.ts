import {Page, NavController, NavParams} from 'ionic-angular';
import {Character} from '../../character';
import {CharacterDetailsPage} from '../character-details/character-details';

@Page({
  templateUrl: 'build/pages/biography/biography.html',
})
export class Biography {
  public char: Character;

  constructor(public nav: NavController, private params: NavParams) {
    this.nav = nav;
    this.char = params.data;
  }

  onPageWillEnter() {
      console.log("biography tab");
  }
}
