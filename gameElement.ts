import * as THREE from 'three';
import Type from './type';

class GameElement extends THREE.Mesh {
    type: Type;
    speed: number;
    direction: number;
    startTime: number;
    geometry: THREE.Geometry;
    material: THREE.Material;
    position: THREE.position;
    translateX: THREE.translateX;
    translateY: THREE.translateY;
    rotation: THREE.rotation;

    public init_position() {
        this.position.x = Math.random()*(4-(-4))+(-4);
        this.position.y = Math.random()*(4-(-4))+(-4);
        this.position.z = Math.random()*(4-(-4))+(-4);
    }

    public move() {
    }

    public update_color() {
        this.material = new THREE.MeshBasicMaterial( { color: this.type == Type.Collect ? 0x00ff00 : 0xff0000} );
    }

    public onClick(removeElement: any, isGameOver: any) {
        if (this.type == Type.Collect) {
            removeElement(this);
            if(isGameOver()) {
                alert("You won");
            }
        }
        else {
            alert("Game Over");
        }
    }
}

export default GameElement;