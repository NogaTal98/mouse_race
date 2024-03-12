// set the start screen contains the "start" button
import * as THREE from 'three';
import GameElement from './gameElement';

class StartScreen{
    scene: THREE.Scene;
    screenElements: GameElement[] = [];

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