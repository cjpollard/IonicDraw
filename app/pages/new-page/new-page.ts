import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/new-page/new-page.html',
})
export class NewPagePage {
  private nav: NavController;

  constructor(nav) {
    this.nav = nav;
    console.log("New page");
  }
}
