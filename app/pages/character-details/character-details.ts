import {Page, NavController, NavParams, Platform} from 'ionic-angular';
import {Vibration} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/character-details/character-details.html',
})
export class CharacterDetailsPage {
  private nav: NavController;
  private platform: Platform;
  public params: NavParams;
  public char: any;
  public title: string;
  public tab: string = "characteristics";

  constructor(nav: NavController, platform: Platform, params: NavParams) {
    this.nav = nav;
    this.params = params;
    this.platform = platform;
    this.char = params.get("char");
    this.title = this.char.name;
    this.init();
  }

  init() {
    console.log("New page");
    this.platform.ready().then(() => {
      Vibration.vibrate(500);
    });
  }
}
