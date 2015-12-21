import {Page, NavController, DeviceMotion, IonicPlatform} from 'ionic/ionic';
import {GlobalFunctions} from '../globals';

import "./motion-draw.scss";

@Page({
  templateUrl: 'app/motion-draw/motion-draw.html',
  providers: [GlobalFunctions]
})
export class MotionDrawPage {
  constructor(nav: NavController, fn: GlobalFunctions, platform: IonicPlatform) {
    this.nav = nav;
    this.fn = fn;
    this.canvas = document.getElementById("drawSurface");    
    this.context = this.canvas.getContext("2d");
    this.deviceAxis = {};
    this.x;
    this.y;
    this.z;
    platform.ready().then(() => {
        let watch = DeviceMotion.watchAcceleration({frequency: 20});
        watch.source.subscribe((data) => {
            this.x = data.acceleration.x;    
            this.y = data.acceleration.y;    
            this.z = data.acceleration.z;    
        })        
    })
    this.init();
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
          
    function start(event) {
      event.preventDefault();
 
      var offsetLeft = getOffset(canvas).left;
      var offsetTop = getOffset(canvas).top;
      
      var initialX = DeviceMotion.getCurrentAcceleration().x;
      var initialY = DeviceMotion.getCurrentAcceleration().y;
      
      that.deviceAxis = DeviceMotion.watchAcceleration();
      
      that.deviceAxis.source.subscribe((data) => {
          that.y = data.acceleration.y;
          that.x = data.acceleration.x;
          that.z = data.acceleration.z;
      })
      
      context.beginPath();
      context.moveTo(initialX-offsetLeft, initialY-offsetTop);
      context.lineTo(that.x-offsetLeft, that.y-offsetTop);
      context.strokeStyle = "black";
      context.stroke();
      
    }
    
    function stop(event) {
      event.preventDefault();
      this.context.closePath();
      this.deviceAxis.clear();
    }
          
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    
  } 
  
  clearCanvas() {
    this.context.clearRect(0, 0, 500, 500);
  }
    
    
  saveCanvas() {
    this.imgData = this.context.getImageData(0, 0, 300, 500);
  }
  
  loadCanvas() {
    this.context.putImageData(this.imgData, 0, 0);
  }
  
}