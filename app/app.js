var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_1 = require('ionic-framework/ionic');
var home_1 = require('./pages/home/home');
var draw_pad_1 = require('./pages/draw-pad/draw-pad');
var motion_draw_1 = require('./pages/motion-draw/motion-draw');
var notes_1 = require('./pages/notes/notes');
var gallery_1 = require('./pages/gallery/gallery');
var data_1 = require('./data');
var MyApp = (function () {
    function MyApp(app, platform, dataService) {
        // set up our app
        this.app = app;
        this.platform = platform;
        this.initializeApp();
        this.dataService = dataService;
        // set our app's pages
        this.pages = [
            { title: 'HomePage', component: home_1.HomePage },
            { title: 'DrawPad', component: draw_pad_1.DrawPadPage },
            { title: 'MotionDraw', component: motion_draw_1.MotionDrawPage },
            { title: 'NotesPage', component: notes_1.NotesPage },
            { title: 'GalleryPage', component: gallery_1.GalleryPage }
        ];
        this.rootPage = home_1.HomePage;
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
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
    };
    MyApp.prototype.openPage = function (page) {
        // navigate to the new page if it is not the current page
        var nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    };
    MyApp = __decorate([
        ionic_1.App({
            templateUrl: 'build/app.html',
            providers: [data_1.DataService],
            config: {}
        }), 
        __metadata('design:paramtypes', [ionic_1.IonicApp, ionic_1.Platform, data_1.DataService])
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
//# sourceMappingURL=app.js.map