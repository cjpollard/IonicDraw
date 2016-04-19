import {Page, Platform, NavController} from 'ionic-angular';
import {Connection, Network} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {

  public map: any;

  constructor(public nav: NavController, private platform: Platform) {
    this.nav = nav;
    this.initialiseMap();
  }

  loadMapsApi() {
    if(document.getElementById("map-api")) {
      document.body.removeChild(document.getElementById("map-api"));
    }
    window.loadMap = this.loadMap;
    let src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCEZTvpjoho6wfGMHKF6IOMZ8x-5SkUVUw&callback=loadMap";
    let api = document.createElement("script");
    api.src = src;
    api.id = "map-api";
    document.body.appendChild(api);
  }

  loadMap() {
      let minZoomLevel = 16;
      let locationOptions = {timeout: 10000, enableHighAccuracy: true};
      let mapDiv = document.getElementById("map-canvas");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.map = new google.maps.Map(mapDiv, {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
        },
        (error) => {
          this.map = new google.maps.Map(mapDiv, {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(54.65, -2.75),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
        }, locationOptions
      );
  }

  initialiseMap() {
    this.platform.ready().then(() => {

      if(Network.connection === "NONE") {
        return;
      } else {
        this.loadMapsApi();
      }
    });
  }
}
