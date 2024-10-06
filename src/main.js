import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize canvas container and set renderer size to match it
const canvasContainer = document.getElementById('canvas-container');
const width = canvasContainer.clientWidth;
const height = canvasContainer.clientHeight;

// Initialize Three.js Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
renderer.setClearColor(0x1c1c1c);

// Enable gamma correction for accurate colors and lighting
renderer.gammaFactor = 2.2; 
renderer.outputEncoding = THREE.sRGBEncoding; // Use sRGB encoding for better color accuracy

// Append renderer's canvas to container
canvasContainer.appendChild(renderer.domElement);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1).normalize(); // Initial position
camera.add(directionalLight); // Keep light attached to the camera
scene.add(camera); // Ensure the camera is added to the scene

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enables inertia for smoother control
controls.dampingFactor = 0.05; // Damping factor
controls.screenSpacePanning = false; // Disables panning

// GLTFLoader to load the model
const loader = new GLTFLoader();
let model;  // To hold the loaded model

// Load a GLB model
loader.load(
    'assets/spyrocup.glb',
    (gltf) => {
        model = gltf.scene;
        model.traverse((o) => {
            if (o.isMesh && o.material.map) {
                o.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }
        });
        scene.add(model);
        model.position.set(0, -1, 0); // Set model position
        model.scale.set(1, 1, 1); // Set model scale
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Position the camera
camera.position.set(0, 1.5, -4);

// Render function
function animate() {
    requestAnimationFrame(animate);
    if (model) {
        model.rotation.y += 0.01; // Rotate model if it's loaded
    }

    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
}

// Call animate function to start rendering
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height; // Update camera aspect ratio
    camera.updateProjectionMatrix(); // Update camera projection matrix
});