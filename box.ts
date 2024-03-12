//box object with it's type is collect
import * as THREE from 'three';
import GameElement from './gameElement';
import Type from './type';

class Box extends GameElement{

    constructor() {
        super();
        this.type = Type.Collect;
        this.speed = 0.01;
        this.direction = Math.floor(Math.random() * (4-1)+1);
        this.startTime = new Date().getTime();
        const size = Math.random()+0.2;
        this.geometry = new THREE.BoxGeometry( size, size, size);
        this.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        super.init_position();
        super.update_color();
    }

    public move() {
        if (this.direction == 1) {
            this.translateY(-this.speed);
        }
        else if (this.direction == 2) {
            this.translateY(this.speed);
        }
        else if (this.direction == 3) {
            this.translateX(this.speed);
        }
        else {
            this.translateX(-this.speed);
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