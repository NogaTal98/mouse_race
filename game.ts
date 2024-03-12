import * as THREE from 'three';
import GameElement from './gameElement';
import Box from './box';
import Sphere from './sphere';  
import Pyramid from './pyramid';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

class Game{
    scene: THREE.Scene;
    gameElements: GameElement[] = [];
    number_of_boxes: number;
    number_of_spheres: number;
    number_of_pyramids: number;
    isStarted: boolean = false;

    constructor() {
        this.scene = new THREE.Scene();
    }

    initScene () {
        this.gameElements.forEach((element) => {
            this.scene.remove(element);
        });
        this.gameElements = [];
        this.number_of_boxes =  Math.floor(Math.random() * (8-1)+1);
        this.number_of_spheres = Math.floor(Math.random() * (8-1)+1);
        this.number_of_pyramids = Math.floor(Math.random() * (8-1)+1);
        

        for (let i = 0; i < this.number_of_boxes; i++) {
            let box = new Box();
            this.gameElements.push(box);
            this.scene.add(box);
        }
    
        for (let i = 0; i < this.number_of_spheres; i++) {
            let sphere = new Sphere();
            this.gameElements.push(sphere);
            this.scene.add(sphere);
        }
    
        for (let i = 0; i < this.number_of_pyramids; i++) {
            let pyramid = new Pyramid();
            this.gameElements.push(pyramid);
            this.scene.add(pyramid);
        }

        let group = new THREE.Group();
        this.scene.add(group);

        const loader = new FontLoader();
        loader.load( "helvetiker_regular.typeface.json", function ( font ) {
            const geometry = new TextGeometry( '00:00', {
                font: font,
                size: 0.2,
                height: 0.005,
            } );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            var text = new THREE.Mesh( geometry, material );
            text.position.set(0, 3.5, 0);
            group.add( text );
        } );

        this.isStarted = true;
    }

    removeElement(element: GameElement) {
        this.scene.remove(element)
        this.gameElements = this.gameElements.filter((el) => el !== element)
    }

    moveElements() {
        this.gameElements.forEach((element) => {
            element.move()
        })
    }

    isWon() {
        let flag = true;
        this.gameElements.forEach((element) => {
            if (element.geometry.type === 'BoxGeometry' || element.geometry.type === 'CylinderGeometry') {
                flag = false;
            }
        })
        if (flag){
            alert("You Won!");
		    this.isStarted = false;
        }
    }

    endGame() {
        alert("Game Over");
        this.isStarted = false;
    }
}

export default Game;