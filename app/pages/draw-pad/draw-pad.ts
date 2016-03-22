import {Page, NavController, NavParams, Alert, Platform} from 'ionic-framework/ionic';
import {DataService} from '../../data';
import {GlobalFunctions} from '../../globals';
import {GalleryPage} from '../gallery/gallery';
import {Note} from '../../note';


@Page({
    templateUrl: 'build/pages/draw-pad/draw-pad.html',
    providers: [GlobalFunctions, DataService]
})
export class DrawPadPage {
    private nav: NavController;
    private fn: GlobalFunctions;
    private platform: Platform;
    private dataService: DataService;
    private imgData: any;
    private currentColour: string;
    private buttonColour: string;
    private canvas;
    private context;
    private imgUri;

    constructor(nav: NavController, fn: GlobalFunctions, public params: NavParams, dataService: DataService, platform: Platform) {
        this.nav = nav;
        this.fn = fn;
        this.platform = platform;
        this.dataService = dataService;
        this.imgData = {};
        this.currentColour = "black";
        this.buttonColour = "dark";
        this.platform.ready().then(() => {
            this.init();
        });
    }

    getCurrentColour() {
        return this.currentColour;
    }

    init() {

        this.canvas = document.getElementById("drawSurface");
        this.context = this.canvas.getContext("2d");
        let canvas = this.canvas;
        let context = this.context;
        let that = this;

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
        canvas.addEventListener("mousedown", function() {
            canvas.addEventListener("mousemove", msPaint, false);
        }, false);
        canvas.addEventListener("touchmove", paint, false);
        canvas.addEventListener("pointerup", finishPainting, false);
        canvas.addEventListener("mouseup", finishMsPaint, false);
        canvas.addEventListener("touchend", finishPainting, false);
    }

    clearCanvas() {
        this.context.clearRect(0, 0, 500, 500);
    }

    colourSwapper(colour: string, cssClass: string, attr: string) {
        var colourBtn = document.getElementById("brushColour");
        this.currentColour = colour;
        this.buttonColour = attr;
        colourBtn.setAttribute("class", cssClass + " disable-hover");
    }

    changeColour(event) {
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
    }

    getTitle(callback) {
        let prompt = Alert.create({
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
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        callback(data.title);
                    }
                }
            ]
        });
        this.nav.present(prompt);
    }

    saveCanvas() {
        // todo - add error handling
        this.imgUri = this.canvas.toDataURL();
        this.getTitle((imgTitle) => {
            this.dataService.saveNote({ title: imgTitle, note: this.imgUri, type: "canvas", id: 0 }, (success) => {
                console.log("Saved!");
            }, (error) => {
                console.log("Uh oh!");
            });
        });
    }

    loadCanvas() {
        // todo - link with dataService, add error handling
        this.nav.push(GalleryPage);
    }

}