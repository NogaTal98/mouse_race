import * as THREE from 'three';
import Element from './element';
import Type from './type'; 

class Sphere extends Element{

    constructor() {
        super();
        this.type = Type.Avoid;
        this.speed = 0.01;
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.startTime = new Date().getTime();
        const geometry =new THREE.SphereGeometry( Math.random()*0.5 ,32 ,16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.shape = new THREE.Mesh( geometry, material );
        super.init_position();
        super.update_color();
    }

    public move() {
        this.shape.translateX(this.direction*this.speed);
        let delta = (new Date().getTime() - this.startTime)/1000;
        if (delta >= 3) {
            this.direction = -this.direction;
            this.startTime = new Date().getTime();
        }
    }
}

export default Sphere;