import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Draco Loader for Blender Models
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })

// Loading Manager
const loader = new GLTFLoader(new THREE.LoadingManager())
loader.setDRACOLoader(dracoLoader)



// Establish a new scene
const SCENE = new THREE.Scene()

// Load the statue model
let ApolloModel;
loader.load('./apollo.glb', (model) => {
    model.scene.traverse((obj) => 
        obj.material = new THREE.MeshPhongMaterial({ shininess: 45 })
    );
	ApolloModel = model.scene;
    SCENE.add(ApolloModel);
})



// Camera
const CAMERA = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100)
CAMERA.position.set(0, 1.8, 1.9)
SCENE.add(CAMERA)

// Left Side Sun Light (Gives that little glow)
const SUN_LIGHT = new THREE.DirectionalLight(0x435c72, 0.08)
SUN_LIGHT.position.set(-100, 0, -100)
SCENE.add(SUN_LIGHT)

// The light that moves with the cursor
const MOVING_LIGHT = new THREE.PointLight(0x88b2d9, 0.4, 3, 3)
MOVING_LIGHT.position.set(30, 3, 1.8)
SCENE.add(MOVING_LIGHT)



// Establish a global renderer variable
let Renderer;

// Animation function
const animate = async () => {
    Renderer.render(SCENE, CAMERA);
    requestAnimationFrame(animate);
}

// The resize() function is used to resize the scene.
// This is required for if the user resizes the site,
// which is caught using the Window Resize Listener
export const resize = async () => {
	// Set the pixel ratio
	Renderer.setPixelRatio(window.devicePixelRatio);
	// Set the screen size
	Renderer.setSize(window.innerWidth, window.innerHeight);
	// Set the camera aspect ratio (most likely 16:9)
	CAMERA.aspect = window.innerWidth / window.innerHeight;
	// Update projection matrix
	CAMERA.updateProjectionMatrix();
};
// Window Resize Listener
window.addEventListener('resize', resize);

// The setScene() function is the primary function
// for updating the sphere's scene data.
export const setScene = async (canvas) => {
	Renderer = new THREE.WebGLRenderer({
		powerPreference: "high-performance",
		antialias: true,
		canvas: canvas,
		alpha: true
	});
	Renderer.autoClear = true
	Renderer.setPixelRatio(window.devicePixelRatio, 1)
	Renderer.setSize(window.innerWidth, window.innerHeight)
	Renderer.outputEncoding = THREE.sRGBEncoding

	// Size the scene
	await resize();

	// Animate the sphere
	await animate();
};

// Store the previous elapsed time
let PreviousElapsedTime = 0;

// On mouse move, move the light source with it
document.addEventListener('mousemove', (e) => {
    // Establish Delta Time for smooth light movement
    const ELAPSED_TIME = performance.now() / 1000;
    const DELTA_TIME = ELAPSED_TIME - PreviousElapsedTime;
    PreviousElapsedTime = ELAPSED_TIME;

	// Make sure delta_time isn't to high, 
	// if it is, the apollo statue and light glitches
	if (DELTA_TIME > 0.1) return;

    // Establish X and Y constants
    const Y = (e.clientY / window.innerHeight - 0.4) * 9;
    const X = (e.clientX / window.innerWidth - 0.5) * 8;

    // Move the light source
    MOVING_LIGHT.position.y -= (Y + MOVING_LIGHT.position.y - 2) * DELTA_TIME;
    MOVING_LIGHT.position.x += (X - MOVING_LIGHT.position.x) * 2 * DELTA_TIME;
	
	// If the statue is out of place, reset the statues position
	// to the middle of the screen
	if (Math.abs(ApolloModel.position.z) > 0.1) {
		ApolloModel.position.set(0, 0, 0);
	}

	// Else, Move the apollo statue position slightly
	else {
		ApolloModel.position.z -= ((Y * 0.015) + ApolloModel.position.z) * (DELTA_TIME / 2);
    	ApolloModel.position.x += ((X * 0.015) - ApolloModel.position.x) * (DELTA_TIME / 2);
	}
}, false)