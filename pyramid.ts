import * as THREE from 'three';
import GameElement from './gameElement';
import Type from './type';

class Pyramid extends GameElement{

    constructor() {
        super();
        this.type = Math.random() <= 0.5 ? Type.Collect : Type.Avoid;
        this.speed = 0.01;
        this.direction = -1;
        this.startTime = new Date().getTime();
        this.geometry = new THREE.CylinderGeometry(0, Math.random()*(1-0.4)+0.4,  Math.random()*(1-0.4)+0.4, 3, 1 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        super.init_position();
        super.update_color();
    }

    public move() {
        this.rotation.y += this.direction*this.speed;
        let delta = (new Date().getTime() - this.startTime)/1000;
        if (delta >= 4) {
            this.type = this.type == Type.Collect ? Type.Avoid : Type.Collect;
            super.update_color();
            this.startTime = new Date().getTime();
        }
    }
}

export default Pyramid;