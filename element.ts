import * as THREE from 'three';
import Type from './type';

class Element {
    public shape: THREE.Mesh;
    type: Type;
    speed: number;
    direction: number;
    startTime: number;

    public init_position() {
        this.shape.position.x = Math.random()*(4-(-4))+(-4);
        this.shape.position.y = Math.random()*(4-(-4))+(-4);
        this.shape.position.z = 0;
    }

    public move() {
    }

    public update_color() {
        this.shape.material = new THREE.MeshBasicMaterial( { color: this.type == Type.Collect ? 0x00ff00 : 0xff0000} );
    }

    public onClick() {
        if (this.type == Type.Collect) {
            this.shape.position.x = Math.random()*(4-(-4))+(-4);
            this.shape.position.y = Math.random()*(4-(-4))+(-4);
        }
        else if (this.type == Type.Avoid) {
            this.shape.position.x = Math.random()*(4-(-4))+(-4);
            this.shape.position.y = Math.random()*(4-(-4))+(-4);
        }
        else {
            this.shape.position.x = Math.random()*(4-(-4))+(-4);
            this.shape.position.y = Math.random()*(4-(-4))+(-4);
        }
    }
}

export default Element;