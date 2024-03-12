import * as THREE from 'three';
import GameElement from './gameElement';
import Box from './box';
import Sphere from './sphere';  
import Pyramid from './pyramid';
import { Timer } from 'three/addons/misc/Timer.js';

class Game{
    scene: THREE.Scene;
    gameElements: GameElement[] = [];
    number_of_boxes: number;
    number_of_spheres: number;
    number_of_pyramids: number;
    isStarted: boolean = false;
    timer: Timer;

    constructor() {
        this.scene = new THREE.Scene();
    }

    //initiate the game - sets the number of elements and add them to the scene
    initScene () {
        this.gameElements.forEach((element) => {
            this.scene.remove(element);
        });
        this.gameElements = [];
        this.number_of_boxes =  Math.floor(Math.random() * (8-1)+1);
        this.number_of_spheres = Math.floor(Math.random() * (8-1)+1);
        this.number_of_pyramids = Math.floor(Math.random() * (8-1)+1);
        
        //add elements to the scene
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
        
        // set timer atrributes
        var timerText = document.createElement( 'div' );
        timerText.style.position = 'absolute';
        timerText.style.color = 'white';
        timerText.style.top = '0%';
        timerText.style.textAlign = 'center';
        timerText.style.width = '100%';
        timerText.style.margin = '0 auto';
        timerText.innerHTML = '<div id = "timer">00:00</div>'

        document.body.appendChild( timerText );

        this.timer = new Timer();
    }

    //update the timer
    updateTimer() {
        this.timer.update();
        const secElapsed = this.timer.getElapsed().toFixed(0);
        const min = Math.floor(secElapsed / 60);
        const sec = secElapsed % 60;
        document.getElementById("timer").innerHTML ="<div>" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + "</div>";
    }

    // delete element from the scene and gameElements array after being clicked
    removeElement(element: GameElement) {
        this.scene.remove(element)
        this.gameElements = this.gameElements.filter((el) => el !== element)
    }

    // move all elements in the scene
    moveElements() {
        this.gameElements.forEach((element) => {
            element.move()
        })
    }

    // checks if all elements that needed to be collected are collected, if so, declare the game as won
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