import {Page, NavController, NavParams, Platform} from 'ionic-angular';
import {Vibration} from 'ionic-native';
import {Character} from '../../character';
import {Characteristics} from '../characteristics/characteristics';
import {Biography} from '../biography/biography';

@Page({
  templateUrl: 'build/pages/character-details/character-details.html'
})
export class CharacterDetailsPage {
  private nav: NavController;
  private platform: Platform;
  public params: NavParams;
  public char: Character;
  public title: string;
  public characteristics;
  public biography;

  constructor(nav: NavController, platform: Platform, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.platform = platform;
    this.char = params.get("char");
    this.title = this.char.name;
    this.characteristics = Characteristics;
    this.biography = Biography;
  }
}
