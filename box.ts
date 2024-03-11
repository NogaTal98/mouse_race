import * as THREE from 'three';
import Element from './element';
import Type from './type';

class Box extends Element{

    constructor() {
        super();
        this.type = Type.Collect;
        this.speed = 0.01;
        this.direction = Math.floor(Math.random() * (4-1)+1);
        this.startTime = new Date().getTime();
        const size = Math.random()+0.2;
        const geometry = new THREE.BoxGeometry( size, size, size);
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.shape = new THREE.Mesh( geometry, material );
        super.init_position();
        super.update_color();
    }

    public move() {
        if (this.direction == 1) {
            this.shape.translateY(-this.speed);
        }
        else if (this.direction == 2) {
            this.shape.translateY(this.speed);
        }
        else if (this.direction == 3) {
            this.shape.translateX(this.speed);
        }
        else {
            this.shape.translateX(-this.speed);
        }

        let delta = (new Date().getTime() - this.startTime)/1000;
        if (delta >= 2) {
            if (this.direction == 4) {
                this.direction = 1;
            }
            else {
                this.direction++;
            }
            this.startTime = new Date().getTime();
        }
    }
}

export default Box;