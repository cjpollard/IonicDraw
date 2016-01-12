import {Page, NavController, NavParams} from 'ionic/ionic';
import {GlobalFunctions} from '../globals';

import "./draw-pad.scss";

@Page({
  templateUrl: 'app/draw-pad/draw-pad.html',
  providers: [GlobalFunctions]
})
export class DrawPadPage {
  constructor(nav: NavController, fn: GlobalFunctions, public params: NavParams) {
    this.nav = nav;
    this.fn = fn;
    this.imgData = {};
    this.canvas = document.getElementById("drawSurface");    
    this.context = this.canvas.getContext("2d");
    this.currentColour = "black";
    this.init();
  }
  
  getCurrentColour() {
    return this.currentColour;
  }
    
  init() {    
    
    let canvas = this.canvas;
    let context = this.context;
    let that = this;
    that.changeColour();
    
    if(that.params) {
        var baseImage = new Image();
        baseImage.src = that.params.get('img');
        context.drawImage(baseImage, 0, 0, 300, 500);
    }
        
    var lastPt = new Object();
    var msTouchLast;
        
    function paint(event) {
      event.preventDefault();
 
      var offsetLeft = canvas.getBoundingClientRect().left;
      var offsetTop = canvas.getBoundingClientRect().top;
      var heightRatio = 300/canvas.getBoundingClientRect().height;
      var widthRatio = 300/canvas.getBoundingClientRect().width;
      
      for(var i=0;i<event.touches.length;i++) {
        var id = event.touches[i].identifier;   
        if(lastPt[id]) {
          context.beginPath();
          context.moveTo((lastPt[id].x-offsetLeft)*widthRatio, (lastPt[id].y-offsetTop)*heightRatio);
          context.lineTo((event.touches[i].clientX-offsetLeft)*widthRatio, (event.touches[i].clientY-offsetTop)*heightRatio);
          context.strokeStyle = that.getCurrentColour();
          context.stroke(); 
        }
        lastPt[id] = {x:event.touches[i].clientX, y:event.touches[i].clientY};
      }
      
    }
    
    function msPaint(event) {
      event.preventDefault();
      var offsetLeft = canvas.getBoundingClientRect().left;
      var offsetTop = canvas.getBoundingClientRect().top;
      var heightRatio = 300/canvas.getBoundingClientRect().height;
      var widthRatio = 300/canvas.getBoundingClientRect().width;
      
      if(msTouchLast != null) {
        context.beginPath();
        context.moveTo((msTouchLast.x-offsetLeft)*widthRatio, (msTouchLast.y-offsetTop)*heightRatio);
        context.lineTo((event.pageX-offsetLeft)*widthRatio, (event.pageY-offsetTop)*heightRatio);
        context.strokeStyle = that.getCurrentColour();
        context.stroke();
      }
      msTouchLast = {x: event.pageX, y: event.pageY};
    }
    
    function finishPainting(event) {
      event.preventDefault();
      for(var i=0;i<event.changedTouches.length;i++) {
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
  
  colourSwapper(colour: string, attr: string, cssClass: string, newAttr: string) {
    var colourBtn = document.getElementById("brushColour");
    this.currentColour = colour;
    colourBtn.removeAttribute(attr);
    colourBtn.setAttribute("class", cssClass);
    colourBtn.setAttribute(newAttr, "");
  }
    
  changeColour(event) {
    if(event) {
      this.fn.preventEventBubbling(event);
    }
    var colourBtn = document.getElementById("brushColour");
    var colour = colourBtn.classList[0];
    switch(colour) {
      case "button-assertive":
        this.colourSwapper("green", "danger", "button-balanced", "secondary");
        break;
      case "button-balanced":
        this.colourSwapper("blue", "secondary", "button-positive", "default");        
        break;
      case "button-positive":
        this.colourSwapper("black", "default", "button-dark", "dark");        
        break;
      case "button-dark":
        this.colourSwapper("red", "dark", "button-assertive", "danger");
        break;
      default:
        this.currentColour = "black";
        break;
    }
  }
    
  saveCanvas() {
    this.imgData = this.context.getImageData(0, 0, 300, 500);
  }
  
  loadCanvas() {
    this.context.putImageData(this.imgData, 0, 0);
  }
  
}