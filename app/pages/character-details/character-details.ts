import {Page, NavController, NavParams, Platform} from 'ionic-angular';
import {Vibration} from 'ionic-native';
import {MeasurementPipe} from '../../pipes/measurement.pipe';
import {Character} from '../../character';

@Page({
  templateUrl: 'build/pages/character-details/character-details.html',
  pipes: [MeasurementPipe]
})
export class CharacterDetailsPage {
  private nav: NavController;
  private platform: Platform;
  public params: NavParams;
  public char: Character;
  public title: string;
  public tab: string = "characteristics";
  public units: string = "imperial";

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

  convertUnit() {
    this.units = this.units === "imperial" ? "metric" : "imperial";
  }
}
