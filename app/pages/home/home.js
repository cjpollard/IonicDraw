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
var draw_pad_1 = require('../draw-pad/draw-pad');
var HomePage = (function () {
    function HomePage(nav, platform) {
        this.nav = nav;
        this.platform = platform;
    }
    HomePage.prototype.clearPicture = function () {
        var clear = document.getElementById('clicky');
        clear.setAttribute('src', '');
    };
    HomePage.prototype.takePicture = function () {
        var opts = {};
        var clicky = document.getElementById('clicky');
        this.platform.ready().then(function () {
            navigator.camera.getPicture(function (imageURI) {
                clicky.setAttribute('src', imageURI);
            }, function (err) {
            }, opts);
        });
    };
    HomePage.prototype.pushPicture = function () {
        var clicky = document.getElementById('clicky');
        this.nav.push(draw_pad_1.DrawPadPage, { 'img': clicky.getAttribute('src') });
    };
    HomePage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, ionic_1.Platform])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map