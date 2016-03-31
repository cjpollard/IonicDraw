import {Page, NavController, Platform} from 'ionic-angular';
import {DeviceMotion} from 'ionic-native';
import {GlobalFunctions} from '../../globals';


@Page({
    templateUrl: 'build/pages/motion-draw/motion-draw.html',
    providers: [GlobalFunctions]
})
export class MotionDrawPage {
    private platform: Platform;
    private canvas;
    private context;
    private deviceAxis;
    private watch;
    private lastKnownPosition;
    private imgData;

    constructor(nav: NavController, fn: GlobalFunctions, platform: Platform) {
        this.platform = platform;
        this.platform.ready().then(() => {
            this.canvas = document.getElementById("drawSurface");
            this.context = this.canvas.getContext("2d");
            this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
        });
        this.deviceAxis = {};
        this.watch = null;
        this.lastKnownPosition = { x: 200, y: 200 };
    }

    start() {
        let that = this;
        var x, y, z;

        var options = { frequency: 100 };  // Update every 0.1 seconds

        this.watch = DeviceMotion.watchAcceleration(options).subscribe(acceleration => {
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            that.deviceAxis = acceleration;
            that.context.beginPath();

            let lkp = that.lastKnownPosition;
            that.context.moveTo(lkp.x, lkp.y);
            that.lastKnownPosition = { x: lkp.x - Math.round(x), y: lkp.y + Math.round(y) };
            that.context.lineTo(that.lastKnownPosition.x, that.lastKnownPosition.y);
            that.context.strokeStyle = "black";
            that.context.stroke();
            that.context.closePath();
        });
    }

    stop() {
        this.watch.unsubscribe();
        this.context.closePath();
        this.watch = null;
    }

    clearCanvas() {
        this.stop();
        this.context.clearRect(0, 0, 500, 500);
    }

    saveCanvas() {
        this.stop();
        this.imgData = this.context.getImageData(0, 0, 300, 500);
    }

    loadCanvas() {
        this.stop();
        this.context.putImageData(this.imgData, 0, 0);
    }

}