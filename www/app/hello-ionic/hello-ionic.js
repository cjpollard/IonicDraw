import {Page, NavController} from 'ionic/ionic';

import "./hello-ionic.scss";

@Page({
  templateUrl: 'app/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;    
  }   
  
  takePicture() {
    var opts = {};
    var clicky = document.getElementById('clicky');
    
    navigator.camera.getPicture(function(imageURI) {
      clicky.setAttribute('src', imageURI);
    }, function(err) {
      
    }, opts);
  }
}