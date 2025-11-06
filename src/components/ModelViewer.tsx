import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/joy';
import * as THREE from 'three';

const ModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const init = async () => {
      if (!mountRef.current) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent
      mountRef.current.appendChild(renderer.domElement);

      // Set up lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      camera.add(directionalLight);
      scene.add(camera);

      // GLTFLoader with Draco support
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      let model: THREE.Group;

      // Load the model
      loader.load(
        'assets/spyrocup.glb',
        (gltf) => {
          model = gltf.scene;
          model.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh && mesh.material && (mesh.material as THREE.MeshStandardMaterial).map) {
              (mesh.material as THREE.MeshStandardMaterial).map!.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }
          });
          scene.add(model);
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );

      //camera.position.set(0, 5, 1);

      const animate = () => {
        requestAnimationFrame(animate);

        // Tilted elliptical orbit driven by scroll (single loop like the green sketch)
        // angle driven by scroll; adjust multiplier to change speed
        const angle = window.scrollY * 0.003;

        const A = 8; // semi-major axis (x)
        const B = 3; // semi-minor axis (z)
        // 2D ellipse in x/z plane
        const rawX = Math.cos(angle) * A;
        const rawZ = Math.sin(angle) * B;

        // Tilt the ellipse by rotating around the X axis to introduce Y variation
        const incline = Math.PI / 8; // ~22.5° tilt
        const targetX = rawX;
        const targetY = 0.8 + rawZ * Math.sin(incline); // base height + tilt-driven Y
        const targetZ = rawZ * Math.cos(incline);

        // Smooth the camera motion (simple lerp) so movement follows scroll smoothly
        const lerp = 0.12;
        camera.position.x += (targetX - camera.position.x) * lerp;
        camera.position.y += (targetY - camera.position.y) * lerp;
        camera.position.z += (targetZ - camera.position.z) * lerp;

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
     
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
    };

    init();

    return () => {
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, []);

  return <Box ref={mountRef} sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }} />;
};

export default ModelViewer;