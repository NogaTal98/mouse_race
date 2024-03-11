import * as THREE from 'three';
import Element from './element';
import Type from './type';

class Pyramid extends Element{

    constructor() {
        super();
        this.type = Math.random() <= 0.5 ? Type.Collect : Type.Avoid;
        this.speed = 0.01;
        this.direction = 1;
        this.startTime = new Date().getTime();
        const geometry = new THREE.CylinderGeometry(0, Math.random()*0.5,  Math.random()+0.2, 3, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.shape = new THREE.Mesh( geometry, material );
        super.init_position();
        super.update_color();
    }

    public move() {
        this.shape.rotation.y += this.direction*this.speed;
        let delta = (new Date().getTime() - this.startTime)/1000;
        if (delta >= 4) {
            this.type = this.type == Type.Collect ? Type.Avoid : Type.Collect;
            super.update_color();
            this.startTime = new Date().getTime();
        }
    }
}

export default Pyramid;