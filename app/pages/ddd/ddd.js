import {Page, IonicPlaform, Platform} from 'ionic/ionic';
///<reference path="./three.d.ts"/>

@Page({
    templateUrl: 'build/pages/ddd/ddd.html'    
})
export class DDDPage {
    constructor(platform: Platform) {
        this.platform = platform;
        this.platform.ready().then(() => {
            this.init();
        });
    }
    
    init() {
        
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);        
        var renderer = new THREE.WebGLRenderer();
        renderer.context.getExtension("OES_texture_float_linear");
        camera.position.set(0, 0, -10);
        
        scene.add(camera);
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("ddd").appendChild(renderer.domElement);
        
        var geometry = new THREE.SphereGeometry(5);
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
        var sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );
        
        var render = function() {
            requestAnimationFrame( render );        
            renderer.render( scene, camera );       
        }
        
        render();
    }

}