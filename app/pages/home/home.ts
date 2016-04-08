import {Page, NavController, Platform} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {DrawPadPage} from '../draw-pad/draw-pad';


@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    private nav: NavController;
    private platform: Platform;
    constructor(nav: NavController, platform: Platform) {
        this.nav = nav;
        this.platform = platform;
        this.platform.ready().then(() => {
            Camera.cleanup();
        });
    }

    clearPicture() {
        var clear = document.getElementById('clicky');
        clear.setAttribute('src', '');
    }

    takePicture() {
        var opts = {};
        var clicky = document.getElementById('clicky');
        this.platform.ready().then(() => {
            Camera.getPicture({}).then((imageURI) => {
                clicky.setAttribute('src', imageURI);
            }, function(err) {

            });
        });
    }

    pushPicture() {
        var clicky = document.getElementById('clicky');
        this.nav.push(DrawPadPage, { 'img': clicky.getAttribute('src') });
    }
}