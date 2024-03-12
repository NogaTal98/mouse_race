// set the start screen containing the "start" button
import * as THREE from 'three';

class StartScreen{
    scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
        let startButton = new THREE.Mesh();
        startButton.geometry = new THREE.BoxGeometry( 2, 1, 1);
        startButton.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        startButton.material.transparent = true;
        const texture = new THREE.TextureLoader().load( "green-start.png" );
        texture.repeat.set( 1, 1 );
        startButton.material.map = texture;

        this.scene.add(startButton);
    } 
}

export default StartScreen;