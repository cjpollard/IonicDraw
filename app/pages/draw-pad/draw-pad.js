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
var data_1 = require('../../data');
var globals_1 = require('../../globals');
var gallery_1 = require('../gallery/gallery');
var DrawPadPage = (function () {
    function DrawPadPage(nav, fn, params, dataService, platform) {
        var _this = this;
        this.params = params;
        this.nav = nav;
        this.fn = fn;
        this.platform = platform;
        this.dataService = dataService;
        this.imgData = {};
        this.currentColour = "black";
        this.buttonColour = "dark";
        this.platform.ready().then(function () {
            _this.init();
        });
    }
    DrawPadPage.prototype.getCurrentColour = function () {
        return this.currentColour;
    };
    DrawPadPage.prototype.init = function () {
        this.canvas = document.getElementById("drawSurface");
        this.context = this.canvas.getContext("2d");
        var canvas = this.canvas;
        var context = this.context;
        var that = this;
        function drawImageFromParam(img) {
            var baseImage = new Image();
            baseImage.src = img;
            context.drawImage(baseImage, 0, 0, 300, 500);
        }
        if (that.params && that.params.data.img) {
            drawImageFromParam(that.params.get('img'));
        }
        if (that.params && that.params.data.note) {
            drawImageFromParam(that.params.data.note);
        }
        var lastPt = new Object();
        var msTouchLast;
        function paint(event) {
            event.preventDefault();
            var offsetLeft = canvas.getBoundingClientRect().left;
            var offsetTop = canvas.getBoundingClientRect().top;
            var heightRatio = 300 / canvas.getBoundingClientRect().height;
            var widthRatio = 300 / canvas.getBoundingClientRect().width;
            for (var i = 0; i < event.touches.length; i++) {
                var id = event.touches[i].identifier;
                if (lastPt[id]) {
                    context.beginPath();
                    context.moveTo((lastPt[id].x - offsetLeft) * widthRatio, (lastPt[id].y - offsetTop) * heightRatio);
                    context.lineTo((event.touches[i].clientX - offsetLeft) * widthRatio, (event.touches[i].clientY - offsetTop) * heightRatio);
                    context.strokeStyle = that.getCurrentColour();
                    context.stroke();
                }
                lastPt[id] = { x: event.touches[i].clientX, y: event.touches[i].clientY };
            }
        }
        function msPaint(event) {
            event.preventDefault();
            var offsetLeft = canvas.getBoundingClientRect().left;
            var offsetTop = canvas.getBoundingClientRect().top;
            var heightRatio = 300 / canvas.getBoundingClientRect().height;
            var widthRatio = 300 / canvas.getBoundingClientRect().width;
            if (msTouchLast != null) {
                context.beginPath();
                context.moveTo((msTouchLast.x - offsetLeft) * widthRatio, (msTouchLast.y - offsetTop) * heightRatio);
                context.lineTo((event.pageX - offsetLeft) * widthRatio, (event.pageY - offsetTop) * heightRatio);
                context.strokeStyle = that.getCurrentColour();
                context.stroke();
            }
            msTouchLast = { x: event.pageX, y: event.pageY };
        }
        function finishPainting(event) {
            event.preventDefault();
            for (var i = 0; i < event.changedTouches.length; i++) {
                var id = event.changedTouches[i].identifier;
                delete lastPt[id];
            }
        }
        function finishMsPaint(event) {
            event.preventDefault();
            canvas.removeEventListener("mousemove", msPaint, false);
            msTouchLast = null;
        }
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        canvas.addEventListener("pointermove", paint, false);
        canvas.addEventListener("mousedown", function () {
            canvas.addEventListener("mousemove", msPaint, false);
        }, false);
        canvas.addEventListener("touchmove", paint, false);
        canvas.addEventListener("pointerup", finishPainting, false);
        canvas.addEventListener("mouseup", finishMsPaint, false);
        canvas.addEventListener("touchend", finishPainting, false);
    };
    DrawPadPage.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, 500, 500);
    };
    DrawPadPage.prototype.colourSwapper = function (colour, cssClass, attr) {
        var colourBtn = document.getElementById("brushColour");
        this.currentColour = colour;
        this.buttonColour = attr;
        colourBtn.setAttribute("class", cssClass + " disable-hover");
    };
    DrawPadPage.prototype.changeColour = function (event) {
        if (event) {
            this.fn.preventEventBubbling(event);
        }
        var colourBtn = document.getElementById("brushColour");
        var colour = colourBtn.classList[0];
        switch (colour) {
            case "button-assertive":
                this.colourSwapper("green", "button-balanced", "secondary");
                break;
            case "button-balanced":
                this.colourSwapper("blue", "button-positive", "default");
                break;
            case "button-positive":
                this.colourSwapper("black", "button-dark", "dark");
                break;
            case "button-dark":
                this.colourSwapper("red", "button-assertive", "danger");
                break;
            default:
                this.currentColour = "black";
                break;
        }
    };
    DrawPadPage.prototype.getTitle = function (callback) {
        var prompt = ionic_1.Alert.create({
            title: 'Save as...',
            message: "Enter a name for this effort",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        callback(data.title);
                    }
                }
            ]
        });
        this.nav.present(prompt);
    };
    DrawPadPage.prototype.saveCanvas = function () {
        var _this = this;
        // todo - add error handling
        this.imgUri = this.canvas.toDataURL();
        this.getTitle(function (imgTitle) {
            _this.dataService.saveNote({ title: imgTitle, note: _this.imgUri, type: "canvas", id: 0 }, function (success) {
                console.log("Saved!");
            }, function (error) {
                console.log("Uh oh!");
            });
        });
    };
    DrawPadPage.prototype.loadCanvas = function () {
        // todo - link with dataService, add error handling
        this.nav.push(gallery_1.GalleryPage);
    };
    DrawPadPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/draw-pad/draw-pad.html',
            providers: [globals_1.GlobalFunctions, data_1.DataService]
        }), 
        __metadata('design:paramtypes', [ionic_1.NavController, globals_1.GlobalFunctions, ionic_1.NavParams, data_1.DataService, ionic_1.Platform])
    ], DrawPadPage);
    return DrawPadPage;
})();
exports.DrawPadPage = DrawPadPage;
//# sourceMappingURL=draw-pad.js.map