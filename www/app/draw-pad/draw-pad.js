import {Page, NavController} from 'ionic/ionic';
import {GlobalFunctions} from '../globals';

import "./draw-pad.scss";

@Page({
  templateUrl: 'app/draw-pad/draw-pad.html',
  providers: [GlobalFunctions]
})
export class DrawPadPage {
  constructor(nav: NavController, fn: GlobalFunctions) {
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
    
    function getOffset(obj) {
      var offsetLeft = 0;
      var offsetTop = 0;
      do {
        if (!isNaN(obj.offsetLeft)) {
          offsetLeft += obj.offsetLeft;
        }
        if (!isNaN(obj.offsetTop)) {
          offsetTop += obj.offsetTop;
        }   
      } while(obj = obj.offsetParent );
      return {left: offsetLeft, top: offsetTop};
    }
        
    var lastPt = new Object();
    var msTouchLast;
        
    function paint(event) {
      event.preventDefault();
 
      var offsetLeft = getOffset(canvas).left;
      var offsetTop = getOffset(canvas).top;
      
      for(var i=0;i<event.touches.length;i++) {
        var id = event.touches[i].identifier;   
        if(lastPt[id]) {
          context.beginPath();
          context.moveTo(lastPt[id].x-offsetLeft, lastPt[id].y-offsetTop);
          context.lineTo(event.touches[i].pageX-offsetLeft, event.touches[i].pageY-offsetTop);
          context.strokeStyle = that.getCurrentColour();
          context.stroke(); 
        }
        lastPt[id] = {x:event.touches[i].pageX, y:event.touches[i].pageY};
      }
      
    }
    
    function msPaint(event) {
      event.preventDefault();
      var offsetLeft = getOffset(canvas).left;
      var offsetTop = getOffset(canvas).top;
      
      if(msTouchLast != null) {
        context.beginPath();
        context.moveTo(msTouchLast.x-offsetLeft, msTouchLast.y-offsetTop);
        context.lineTo(event.pageX-offsetLeft, event.pageY-offsetTop);
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
    
  changeColour(event) {
    this.fn.preventEventBubbling(event);
    var colourBtn = document.getElementById("brushColour");
    var colour = colourBtn.classList[0];
    switch(colour) {
      case "button-assertive":
        this.currentColour = "green";
        colourBtn.removeAttribute("danger");
        colourBtn.setAttribute("class", "button-balanced");
        colourBtn.setAttribute("secondary", "");
        break;
      case "button-balanced":
        this.currentColour = "blue";
        colourBtn.removeAttribute("secondary");
        colourBtn.setAttribute("class", "button-positive");
        colourBtn.setAttribute("default", "");
        break;
      case "button-positive":
        this.currentColour = "black";
        colourBtn.removeAttribute("default");
        colourBtn.setAttribute("class", "button-dark");
        colourBtn.setAttribute("dark", "");
        break;
      case "button-dark":
        this.currentColour = "red";
        colourBtn.removeAttribute("dark");
        colourBtn.setAttribute("class", "button-assertive");
        colourBtn.setAttribute("danger", "");
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