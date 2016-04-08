import {Page, NavController} from 'ionic-angular';
import {Vibration} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/new-page/new-page.html',
})
export class NewPagePage {
  private nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
    this.init();
  }

  init() {
    console.log("New page");
    Vibration.vibrate(500);
  }
}
