import * as THREE from 'three';
import Box from './box.ts';
import Sphere from './sphere.ts';
import Pyramid from './pyramid.ts';
import GameElement from './gameElement.ts';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const number_of_boxes =  Math.floor(Math.random() * (8-1)+1);
const number_of_spheres = Math.floor(Math.random() * (8-1)+1);
const number_of_pyramids = Math.floor(Math.random() * (8-1)+1);

let boxes: Box[] = [];
for (let i = 0; i < number_of_boxes; i++) {
	boxes.push(new Box());
	scene.add(boxes[i]);
}

let spheres: Sphere[] = [];
for (let i = 0; i < number_of_spheres; i++) {
	spheres.push(new Sphere());
	scene.add(spheres[i]);
}

let pyramids: Pyramid[] = [];
for (let i = 0; i < number_of_pyramids; i++) {
	pyramids.push(new Pyramid());
	scene.add(pyramids[i]);
}

let width = 0
let height = 0
let intersects = []

window.addEventListener('pointermove', (e) => {
	mouse.set((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1)
	raycaster.setFromCamera(mouse, camera)
	intersects = raycaster.intersectObjects(scene.children, true)
})

window.addEventListener('click', (e) => {
	intersects.forEach((hit: any) => {
		hit.object.onClick(() => removeElement(hit.object))
	})
})

function removeElement(element: GameElement) {
	scene.remove(element)
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