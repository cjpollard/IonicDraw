import {Alert, Page, Platform, NavController} from 'ionic-angular';
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

  loadMap() {
      let minZoomLevel = 16;
      let locationOptions = {timeout: 10000, enableHighAccuracy: true};
      let mapDiv = document.getElementById("map-canvas");

      let styles = [{
        featureType: "landscape.man_made",
        stylers: [{
          visibility: "off"
        }]
      },{
        featureType: "poi",
        stylers: [{
          visibility: "on"
        }]
      },{
        featureType: "road",
        stylers: [{
          visibility: "on"
        }]
      },{
        featureType: "transit",
        stylers: [{
          visibility: "off"
        }]
      }];

      let styledMap = new google.maps.StyledMapType(styles, {name: "road map"});

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.map = new google.maps.Map(mapDiv, {
            zoom: minZoomLevel,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeControlOptions: {
              mapTypeId: [google.maps.MapTypeId.ROADMAP, "road_map"]
            }
          });
          this.map.mapTypes.set("road_map", styledMap);
          this.map.setMapTypeId("road_map");
        },
        (error) => {
          this.map = new google.maps.Map(mapDiv, {
            zoom: 5,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
        }, locationOptions
      );
  }

  loadMapsApi() {
    if(document.getElementById("map-api")) {
      document.body.removeChild(document.getElementById("map-api"));
    }
    window["loadMap"] = this.loadMap;
    let src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCEZTvpjoho6wfGMHKF6IOMZ8x-5SkUVUw&callback=loadMap";
    let api = document.createElement("script");
    api.src = src;
    api.id = "map-api";
    document.body.appendChild(api);
  }

  initialiseMap() {
    this.platform.ready().then(() => {

      if(Network.connection === "none") {
        this.nav.pop();
        let alert = Alert.create({
            title: 'Connection',
            message: 'You need to be connected to use this page.',
            buttons: [{
                text: 'Fine, gimme a sec.',
                handler: () => {
                  this.nav.remove();
                  if(typeof cordova.plugins.settings.openSetting !== "undefined") {
                    cordova.plugins.settings.openSetting("wifi", () => {
                      console.log("Opened wifi settings");
                    }, () => {
                      console.log("Could not open settings.");
                    });
                  } else {
                    cordova.plugins.settings.open(() => {
                      console.log("Opened settings");
                    }, () => {
                      console.log("Could not open settings.");
                    });
                  }
                }
            }]
        });
        this.nav.present(alert);
      } else {
        this.loadMapsApi();
      }
    });
  }
}
