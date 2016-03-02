import {App, IonicApp, Platform} from 'ionic-framework/ionic';

import {HomePage} from './pages/home/home';
import {DrawPadPage} from './pages/draw-pad/draw-pad';
import {MotionDrawPage} from './pages/motion-draw/motion-draw';
import {NotesPage} from './pages/notes/notes';
import {GalleryPage} from './pages/gallery/gallery';
import {DataService} from './data';

@App({
  templateUrl: 'build/app.html',
  providers: [DataService],
  config: {}
})
export class MyApp {

  private app: IonicApp;
  private platform: Platform;
  private dataService: DataService;
  private pages: Array<any>;
  private rootPage: any;

  constructor(app: IonicApp, platform: Platform, dataService: DataService) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    this.dataService = dataService;

    // set our app's pages
    this.pages = [
      { title: 'HomePage', component: HomePage },
      { title: 'DrawPad', component: DrawPadPage },
      { title: 'MotionDraw', component: MotionDrawPage },
      { title: 'NotesPage', component: NotesPage },
      { title: 'GalleryPage', component: GalleryPage }
    ];

    this.rootPage = HomePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleBlackTranslucent();
      }
    });
  }

  openPage(page) {
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

}