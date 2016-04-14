import 'es6-shim';
import 'rxjs/Rx';
import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {DrawPadPage} from './pages/draw-pad/draw-pad';
import {MotionDrawPage} from './pages/motion-draw/motion-draw';
import {NotesPage} from './pages/notes/notes';
import {GalleryPage} from './pages/gallery/gallery';
import {CharacterListPage} from './pages/character-list/character-list';
import {DataService} from './services/data.service';
import {CharacterService} from './services/character.service';

@App({
    templateUrl: 'build/app.html',
    providers: [CharacterService, DataService],
    config: {}
})
export class MyApp {

    private app: IonicApp;
    private platform: Platform;
    private characterService: CharacterService;
    private dataService: DataService;
    private pages: Array<any>;
    private rootPage: any;

    constructor(app: IonicApp, platform: Platform, dataService: DataService, characterService: CharacterService) {

        // set up our app
        this.app = app;
        this.platform = platform;
        this.initializeApp();
        this.dataService = dataService;
        this.characterService = characterService;

        // set our app's pages
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'DrawPad', component: DrawPadPage },
            { title: 'MotionDraw', component: MotionDrawPage },
            { title: 'Notes', component: NotesPage },
            { title: 'Gallery', component: GalleryPage },
            { title: 'Characters', component: CharacterListPage }
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
        nav.push(page.component);
    }

}