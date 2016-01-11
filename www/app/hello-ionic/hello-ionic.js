import {Page, NavController} from 'ionic/ionic';
import {DrawPadPage} from '../draw-pad/draw-pad';
import "./hello-ionic.scss";

@Page({
  templateUrl: 'app/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;    
  }     
  
  clearPicture() {
      var clear = document.getElementById('clicky');
      clear.setAttribute('src', '');
  }
  
  takePicture() {
    var opts = {};
    var clicky = document.getElementById('clicky');
    
    navigator.camera.getPicture(function(imageURI) {
      clicky.setAttribute('src', imageURI);
    }, function(err) {
      
    }, opts);
  }  
  
  pushPicture() {
      var clicky = document.getElementById('clicky');
      this.nav.push(DrawPadPage, {'img': clicky.getAttribute('src')})
  }
}