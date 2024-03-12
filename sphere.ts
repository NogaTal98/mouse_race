// sphere object with it's type is avoid
import * as THREE from 'three';
import GameElement from './gameElement';
import Type from './type'; 

class Sphere extends GameElement{

    constructor() {
        super();
        this.type = Type.Avoid;
        this.speed = 0.01;
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.startTime = new Date().getTime();
        this.geometry = new THREE.SphereGeometry( Math.random()*(0.5-0.2)+0.2 ,32 ,16 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        super.init_position();
        super.update_color();
    }

    public move() {
        this.translateX(this.direction*this.speed);
        let delta = (new Date().getTime() - this.startTime)/1000;
        if (delta >= 3) {
            this.direction = -this.direction;
            this.startTime = new Date().getTime();
        }
    }
}

export default Sphere;