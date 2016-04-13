import {Page, NavController, NavParams} from 'ionic-angular';
import {Character} from '../../character';
import {MeasurementPipe} from '../../pipes/measurement.pipe';
import {CharacterDetailsPage} from '../character-details/character-details';

@Page({
  templateUrl: 'build/pages/characteristics/characteristics.html',
  pipes: [MeasurementPipe]
})
export class Characteristics {
  public units: string;
  public char: Character;

  constructor(public nav: NavController, private params: NavParams) {
    this.nav = nav;
    this.char = params.data;
  }

  convertUnit() {
    this.units = this.units === "imperial" ? "metric" : "imperial";
  }

  onPageWillEnter() {
    console.log("characteristics tab");
  }
}
