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
var globals_1 = require('../../globals');
var MotionDrawPage = (function () {
    function MotionDrawPage(nav, fn, platform) {
        var _this = this;
        this.platform = platform;
        this.platform.ready().then(function () {
            _this.canvas = document.getElementById("drawSurface");
            _this.context = _this.canvas.getContext("2d");
            _this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
        });
        this.deviceAxis = {};
        this.watch;
        this.lastKnownPosition = { x: 200, y: 200 };
    }
    MotionDrawPage.prototype.start = function () {
        var that = this;
        var x, y, z;
        function onSuccess(acceleration) {
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            that.deviceAxis = acceleration;
            that.context.beginPath();
            var lkp = that.lastKnownPosition;
            that.context.moveTo(lkp.x, lkp.y);
            that.lastKnownPosition = { x: lkp.x - Math.round(x), y: lkp.y + Math.round(y) };
            that.context.lineTo(that.lastKnownPosition.x, that.lastKnownPosition.y);
            that.context.strokeStyle = "black";
            that.context.stroke();
            that.context.closePath();
        }
        function onError() {
            alert('Something went wrong, release the bees!');
        }
        var options = { frequency: 100 }; // Update every 0.1 seconds
        that.watch = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    };
    MotionDrawPage.prototype.stop = function () {
        var that = this;
        navigator.accelerometer.clearWatch(that.watch);
        that.context.closePath();
        that.watch = null;
    };
    MotionDrawPage.prototype.clearCanvas = function () {
        this.stop();
        this.context.clearRect(0, 0, 500, 500);
    };
    MotionDrawPage.prototype.saveCanvas = function () {
        this.stop();
        this.imgData = this.context.getImageData(0, 0, 300, 500);
    };
    MotionDrawPage.prototype.loadCanvas = function () {
        this.stop();
        this.context.putImageData(this.imgData, 0, 0);
    };
    MotionDrawPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/motion-draw/motion-draw.html',
            providers: [globals_1.GlobalFunctions]
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, globals_1.GlobalFunctions, ionic_1.Platform])
    ], MotionDrawPage);
    return MotionDrawPage;
})();
exports.MotionDrawPage = MotionDrawPage;
//# sourceMappingURL=motion-draw.js.map