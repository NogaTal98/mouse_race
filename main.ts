import * as THREE from 'three';
import Game from './game.ts';
import StartScreen from './startScreen.ts';

const game = new Game();
const startScreen = new StartScreen();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let intersects = []
window.addEventListener('pointermove', (e) => {
	mouse.set((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1)
	raycaster.setFromCamera(mouse, camera)
	intersects = raycaster.intersectObjects(game.isStarted ? game.scene.children : startScreen.scene.children, true)
})

window.addEventListener('click', (e) => {
	intersects.forEach((hit: any) => {
		if (game.isStarted) {
			hit.object.onClick(() => game.removeElement(hit.object), () => game.endGame());
		}
		else {
			game.initScene();
		}
	})
})

camera.position.z = 5;

//lights
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
		renderer.render( startScreen.scene, camera );
	}
}
animate();