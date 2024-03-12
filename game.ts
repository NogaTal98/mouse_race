import * as THREE from 'three';
import GameElement from './gameElement';
import Box from './box';
import Sphere from './sphere';  
import Pyramid from './pyramid';

class Game{
    scene: THREE.Scene;
    gameElements: GameElement[] = [];
    number_of_boxes: number = Math.floor(Math.random() * (8-1)+1);
    number_of_spheres: number = Math.floor(Math.random() * (8-1)+1);
    number_of_pyramids: number = Math.floor(Math.random() * (8-1)+1);
    isStarted: boolean = false;

    constructor() {
        this.scene = new THREE.Scene();
    }

    initScene () {
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

        this.isStarted = true;
    }

    removeElement(element: GameElement) {
        this.scene.remove(element)
    }

    moveElements() {
        this.gameElements.forEach((element) => {
            element.move()
        })
    }
}

export default Game;