import * as THREE from 'three';

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

// Append renderer's canvas to container
canvasContainer.appendChild(renderer.domElement);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1).normalize(); // Initial position
camera.add(directionalLight); // Keep light attached to the camera
scene.add(camera); // Ensure the camera is added to the scene

// Initialize OrbitControls dynamically
const initControls = async () => {
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
    return new OrbitControls(camera, renderer.domElement);
};

// GLTFLoader to load the model dynamically
const initGLTFLoader = async () => {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
    return new GLTFLoader();
};

// Load the model
const loadModel = (loader, controls) => {
    loader.load(
        'assets/spyrocup.glb',
        (gltf) => {
            const model = gltf.scene;
            model.traverse((o) => {
                if (o.isMesh && o.material.map) {
                    o.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }
            });
            scene.add(model);
            model.position.set(0, -1, 0); // Set model position
            model.scale.set(1, 1, 1); // Set model scale
            animate(model, controls); // Start animation after model is loaded
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );
};

// Position the camera
camera.position.set(0, 1.5, -4);

// Render function
const animate = (model, controls) => {
    function render() {
        requestAnimationFrame(render);
        if (model) {
            model.rotation.y += 0.01; // Rotate model if it's loaded
        }
        controls.update(); // Update controls
        renderer.render(scene, camera); // Render the scene
    }
    render();
};

// Initialize GLTFLoader and load the model
const init = async () => {
    const loader = await initGLTFLoader();
    const controls = await initControls(); // Initialize controls here
    loadModel(loader, controls); // Pass controls to loadModel
};

// Call init function to start loading
init();

// Handle window resize
window.addEventListener('resize', () => {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height; // Update camera aspect ratio
    camera.updateProjectionMatrix(); // Update camera projection matrix
});