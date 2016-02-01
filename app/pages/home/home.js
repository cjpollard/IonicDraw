import {Page, NavController} from 'ionic/ionic';
import {DrawPadPage} from '../draw-pad/draw-pad';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
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
    this.platform.ready().then(() => {
        navigator.camera.getPicture(function(imageURI) {
        clicky.setAttribute('src', imageURI);
        }, function(err) {
        
        }, opts);        
    });
  }  
  
  pushPicture() {
      var clicky = document.getElementById('clicky');
      this.nav.push(DrawPadPage, {'img': clicky.getAttribute('src')})
  }
}