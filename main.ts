import * as THREE from 'three';
import Game from './game.ts';
import StartScreen from './startScreen.ts';

//initiate game scene, start-screen scene, and camera
const game = new Game();
const startScreen = new StartScreen();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//calculate mouse position and intersection with objects to enable click events
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let intersects: any[] = []
window.addEventListener('pointermove', (e) => {
	mouse.set((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1)
	raycaster.setFromCamera(mouse, camera)
	intersects = raycaster.intersectObjects(game.isStarted ? game.scene.children : startScreen.scene.children, true)
})

//click event
window.addEventListener('click', (e) => {
	if (intersects.length > 0) {
		if (game.isStarted) {
			intersects[0].object.onClick(() => game.removeElement(intersects[0].object), () => game.endGame());
		}
		else {
			game.initScene();
		}
	}
})

camera.position.z = 5;

//add lights to the scene
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight1.position.set( 0, 0.2, 1);
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight2.position.set( 0, 1, 0);
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
game.scene.add( directionalLight1, directionalLight2, ambientLight);

function animate() {
	requestAnimationFrame( animate );

	if (game.isStarted) {
		game.updateTimer();
		game.moveElements();
		renderer.render( game.scene, camera );
		game.isWon();
	}
	else {
		document.getElementById("timer")?.remove();
		renderer.render( startScreen.scene, camera );
	}
}
animate();