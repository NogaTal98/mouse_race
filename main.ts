import * as THREE from 'three';
import Box from './box.ts';
import Sphere from './sphere.ts';
import Pyramid from './pyramid.ts';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const number_of_boxes =  Math.floor(Math.random() * (5-1)+1);
const number_of_spheres = Math.floor(Math.random() * (5-1)+1);
const number_of_pyramids = Math.floor(Math.random() * (5-1)+1);

let boxes: Box[] = [];
for (let i = 0; i < number_of_boxes; i++) {
	boxes.push(new Box());
	scene.add(boxes[i].shape);
}

let spheres: Sphere[] = [];
for (let i = 0; i < number_of_spheres; i++) {
	spheres.push(new Sphere());
	scene.add(spheres[i].shape);
}

let pyramids: Pyramid[] = [];
for (let i = 0; i < number_of_pyramids; i++) {
	pyramids.push(new Pyramid());
	scene.add(pyramids[i].shape);
}

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	for (let i = 0; i < number_of_boxes; i++) {
		boxes[i].move();
	}
	for (let i = 0; i < number_of_spheres; i++) {
		spheres[i].move();
	}
	for (let i = 0; i < number_of_pyramids; i++) {
		pyramids[i].move();
	}

	renderer.render( scene, camera );
}
animate();