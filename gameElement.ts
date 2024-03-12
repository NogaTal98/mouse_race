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

    // sets the position of the object to a random position
    public init_position() {
        this.position.x = Math.random()*(2-(-2))+(-2);
        this.position.y = Math.random()*(2-(-2))+(-2);
        this.position.z = Math.random()*(2-(-2))+(-2);
    }

    // the move function is different for each object, but all of them have to implement it
    public move() {
    }

    // updates the color of the object based on it's type
    public update_color() {
        this.material = new THREE.MeshPhongMaterial( { color: this.type == Type.Collect ? 0x00ff00 : 0xff0000} );
    }

    // click handler - if the object is collectable, it will be removed from the scene, otherwise the game will end
    public onClick(removeElement: any, EndGame: any) {
        if (this.type == Type.Collect) {
            removeElement(this);
        }
        else {
            EndGame();
        }
    }
}

export default GameElement;