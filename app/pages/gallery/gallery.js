import {Page, IonicPlaform} from 'ionic/ionic';


@Page({
    templateUrl: 'build/pages/gallery/gallery.html'    
})
export class GalleryPage {
    constructor() {
        this.images = [];
        this.getImages();
    }
    
    getImages() {
        window.imagePicker.getPictures(function(results) {
            for(let i=0; i<results.length; i++) {
                this.images.push(results[i]);
            }            
        }, function(error) {
            console.log('Something bad happened...\n' + error);    
        }, {
            maximumImagesCount: 10,
            width: 500
        });
    }
}