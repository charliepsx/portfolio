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
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const camera = new THREE.PerspectiveCamera(
        isMobile ? 70 : 60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      // Lower pixel ratio on mobile for perf, full on desktop
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent
      mountRef.current.appendChild(renderer.domElement);

      // Set up lights (brighter + rim light so model pops)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      // subtle rim/back light to increase silhouette contrast
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
      rimLight.position.set(-1.2, 0.6, -1);
      scene.add(rimLight);
      camera.add(directionalLight);
      camera.add(rimLight);
      scene.add(camera);

      // GLTFLoader with Draco support
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      let model: THREE.Group;
      let isReady = false;

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
          // Base transform
          model.position.set(0, -1.5, 0);
          model.rotateY(1.2);
          model.scale.set(1, 1, 1);

          // Responsive adjustments for smaller screens
          if (isMobile) {
            // reduce further and center a bit higher so it peeks above content
            model.scale.set(0.4, 0.4, 0.4);
            model.position.set(0, -0.6, 0);
          }
          isReady = true;
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );

      // position camera; slightly different for mobile
      camera.position.set(0, isMobile ? 0.8 : 1, isMobile ? 3.6 : 4);
      camera.fov = isMobile ? 68 : 60;
      camera.updateProjectionMatrix();

      const animate = () => {
        requestAnimationFrame(animate);

        if (model && isReady) {
          // slow continuous rotation
          model.rotation.y += 0.004;
        }

        // Tilted elliptical orbit driven by scroll (single loop like the green sketch)
        // angle driven by scroll; adjust multiplier to change speed
        const scrollFactor = isMobile ? 0.0016 : 0.003;
        const angle = window.scrollY * scrollFactor;

        const A = isMobile ? 3.8 : 8; // semi-major axis (x)
        const B = isMobile ? 1.8 : 3; // semi-minor axis (z)
        // 2D ellipse in x/z plane
        const rawX = Math.cos(angle) * A;
        const rawZ = Math.sin(angle) * B;

        // Tilt the ellipse by rotating around the X axis to introduce Y variation
        const incline = isMobile ? Math.PI / 14 : Math.PI / 8; // less tilt on mobile
        const targetX = rawX;
        const targetY = (isMobile ? 0.6 : 0.8) + rawZ * Math.sin(incline); // base height + tilt-driven Y
        const targetZ = rawZ * Math.cos(incline);

        // Smooth the camera motion (simple lerp) so movement follows scroll smoothly
        const lerp = isMobile ? 0.18 : 0.12; // slightly more smoothing on mobile
        camera.position.x += (targetX - camera.position.x) * lerp;
        camera.position.y += (targetY - camera.position.y) * lerp;
        camera.position.z += (targetZ - camera.position.z) * lerp;

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);

      };
      animate();

      const handleResize = () => {
        const m = window.matchMedia('(max-width: 768px)').matches;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = m ? 68 : 60;
        camera.updateProjectionMatrix();
        const dprNow = Math.min(window.devicePixelRatio || 1, m ? 1.5 : 2);
        renderer.setPixelRatio(dprNow);
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