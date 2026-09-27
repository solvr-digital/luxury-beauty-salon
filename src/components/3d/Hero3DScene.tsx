import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DSceneProps {
  scrollProgress?: number;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ scrollProgress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    objects?: { [key: string]: THREE.Group | THREE.Mesh };
    particles?: THREE.Points;
    reqId?: number;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Luxury Studio Lighting (Warm Bronze & Dark Espresso Ambience) ---
    const ambientLight = new THREE.AmbientLight(0xfff3e6, 1.2);
    scene.add(ambientLight);

    // Warm Key Light (Luxury Studio Spotlight)
    const keyLight = new THREE.DirectionalLight(0xffecd6, 3.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    // Warm Bronze Fill Light
    const bronzeFill = new THREE.DirectionalLight(0xb37446, 2.4);
    bronzeFill.position.set(-6, -2, 4);
    scene.add(bronzeFill);

    // High Specular Rim Light for Metallic Edge Sheen
    const rimLight = new THREE.PointLight(0xffe2b8, 3.0, 20);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Dynamic Accent Spotlight
    const accentSpot = new THREE.SpotLight(0xd4af37, 2.5, 18, Math.PI / 5, 0.4);
    accentSpot.position.set(3, 4, 6);
    scene.add(accentSpot);

    // --- Physically Realistic Luxury Materials ---
    // 1. Brushed Gold Material
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.94,
      roughness: 0.2,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.96,
    });

    // 2. Polished Warm Bronze Material (LUMIÈRE Signature)
    const bronzeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb37446,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.92,
    });

    // 3. Matte Black / Espresso Ceramic Material
    const matteEspressoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x14100e,
      metalness: 0.15,
      roughness: 0.42,
      clearcoat: 0.35,
    });


    // 5. Frosted Glass (Perfume & Serum Flacons)
    const frostedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfffaf5,
      metalness: 0.05,
      roughness: 0.16,
      transmission: 0.9,
      transparent: true,
      opacity: 0.88,
      ior: 1.52,
      thickness: 1.5,
    });

    // 6. Amber Fragrance Liquid
    const amberLiquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xba6820,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.84,
      transparent: true,
      opacity: 0.92,
      ior: 1.38,
    });

    // 7. Luminous Pearl
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcf8f2,
      metalness: 0.3,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const objects: { [key: string]: THREE.Group | THREE.Mesh } = {};

    // ==========================================
    // 1. LUXURY HAIRDRYER (Right Midground)
    // Depth: 15px parallax, slight horizontal drift + slow rotation
    // ==========================================
    const dryerGroup = new THREE.Group();
    const bodyGeo = new THREE.CylinderGeometry(0.38, 0.4, 1.25, 32);
    const body = new THREE.Mesh(bodyGeo, matteEspressoMaterial);
    body.rotation.z = Math.PI / 2;

    const nozzleGeo = new THREE.CylinderGeometry(0.25, 0.38, 0.5, 32);
    const nozzle = new THREE.Mesh(nozzleGeo, bronzeMaterial);
    nozzle.rotation.z = -Math.PI / 2;
    nozzle.position.set(0.85, 0, 0);

    const grilleRingGeo = new THREE.TorusGeometry(0.39, 0.04, 16, 32);
    const grilleRing = new THREE.Mesh(grilleRingGeo, goldMaterial);
    grilleRing.rotation.y = Math.PI / 2;
    grilleRing.position.set(-0.62, 0, 0);

    const grilleBackGeo = new THREE.CylinderGeometry(0.37, 0.37, 0.05, 32);
    const grilleBack = new THREE.Mesh(grilleBackGeo, bronzeMaterial);
    grilleBack.rotation.z = Math.PI / 2;
    grilleBack.position.set(-0.64, 0, 0);

    const handleGeo = new THREE.CylinderGeometry(0.18, 0.16, 1.15, 32);
    const handle = new THREE.Mesh(handleGeo, matteEspressoMaterial);
    handle.position.set(-0.15, -0.75, 0);
    handle.rotation.z = 0.16;

    const handleRingGeo = new THREE.TorusGeometry(0.19, 0.025, 16, 32);
    const handleRing = new THREE.Mesh(handleRingGeo, bronzeMaterial);
    handleRing.position.set(-0.15, -0.24, 0);
    handleRing.rotation.x = Math.PI / 2;

    dryerGroup.add(body, nozzle, grilleRing, grilleBack, handle, handleRing);
    dryerGroup.position.set(3.0, 0.85, 0.6);
    dryerGroup.scale.set(0.95, 0.95, 0.95);
    dryerGroup.rotation.set(-0.25, -0.65, 0.3);
    scene.add(dryerGroup);
    objects.hairdryer = dryerGroup;

    // ==========================================
    // 4. COSMETIC SERUM DROPPER BOTTLE (Right Lower)
    // Depth: 18px parallax, subtle depth movement
    // ==========================================
    const serumGroup = new THREE.Group();
    const vialGeo = new THREE.CylinderGeometry(0.36, 0.36, 1.35, 32);
    const vial = new THREE.Mesh(vialGeo, frostedGlassMaterial);

    const vialLiquidGeo = new THREE.CylinderGeometry(0.31, 0.31, 1.15, 32);
    const vialLiquid = new THREE.Mesh(vialLiquidGeo, amberLiquidMaterial);
    vialLiquid.position.set(0, -0.05, 0);

    const serumCollarGeo = new THREE.CylinderGeometry(0.35, 0.37, 0.3, 32);
    const serumCollar = new THREE.Mesh(serumCollarGeo, bronzeMaterial);
    serumCollar.position.set(0, 0.8, 0);

    const bulbGeo = new THREE.SphereGeometry(0.22, 24, 24);
    bulbGeo.scale(1, 1.35, 1);
    const bulb = new THREE.Mesh(bulbGeo, pearlMaterial);
    bulb.position.set(0, 1.15, 0);

    serumGroup.add(vial, vialLiquid, serumCollar, bulb);
    serumGroup.position.set(2.5, -1.4, 0.9);
    serumGroup.scale.set(0.92, 0.92, 0.92);
    serumGroup.rotation.set(-0.2, -0.4, 0.25);
    scene.add(serumGroup);
    objects.serum = serumGroup;

    // ==========================================
    // 5. BRASS & BRONZE COMB (Center Lower)
    // Depth: 12px parallax
    // ==========================================
    const combGroup = new THREE.Group();
    const spineGeo = new THREE.BoxGeometry(1.85, 0.15, 0.05);
    const spine = new THREE.Mesh(spineGeo, bronzeMaterial);
    combGroup.add(spine);

    const teethCount = 26;
    const toothGeo = new THREE.BoxGeometry(0.024, 0.46, 0.03);
    for (let i = 0; i < teethCount; i++) {
      const tooth = new THREE.Mesh(toothGeo, goldMaterial);
      const xPos = -0.82 + (i * 1.64) / (teethCount - 1);
      tooth.position.set(xPos, -0.29, 0);
      combGroup.add(tooth);
    }

    combGroup.position.set(0.7, -2.5, 0.3);
    combGroup.scale.set(0.85, 0.85, 0.85);
    combGroup.rotation.set(0.38, 0.32, -0.25);
    scene.add(combGroup);
    objects.comb = combGroup;

    // ==========================================
    // 6. LUXURY HAIRBRUSH (Paddle Brush)
    // Depth: 14px parallax
    // ==========================================
    const brushGroup = new THREE.Group();
    const paddleGeo = new THREE.BoxGeometry(0.7, 1.1, 0.15);
    const paddle = new THREE.Mesh(paddleGeo, matteEspressoMaterial);

    const brushHandleGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.9, 24);
    const brushHandle = new THREE.Mesh(brushHandleGeo, matteEspressoMaterial);
    brushHandle.position.set(0, -0.9, 0);

    const brushRingGeo = new THREE.TorusGeometry(0.11, 0.025, 16, 24);
    const brushRing = new THREE.Mesh(brushRingGeo, bronzeMaterial);
    brushRing.rotation.x = Math.PI / 2;
    brushRing.position.set(0, -0.45, 0);

    brushGroup.add(paddle, brushHandle, brushRing);
    brushGroup.position.set(-1.8, -2.1, 0.1);
    brushGroup.scale.set(0.7, 0.7, 0.7);
    brushGroup.rotation.set(0.4, -0.5, 0.3);
    scene.add(brushGroup);
    objects.brush = brushGroup;

    // ==========================================
    // 7. SMALL BEAUTY ACCESSORIES (Floating Rings & Pearls)
    // Depth: 25–30px parallax (fastest response)
    // ==========================================
    const accessoriesGroup = new THREE.Group();

    // Floating Bronze Torus Ring
    const accessoryRingGeo = new THREE.TorusGeometry(0.32, 0.04, 16, 32);
    const ringA = new THREE.Mesh(accessoryRingGeo, bronzeMaterial);
    ringA.position.set(-1.9, 0.3, -0.7);
    ringA.rotation.set(0.6, 0.75, 0.2);
    accessoriesGroup.add(ringA);

    // Floating Gold Torus Ring
    const ringB = new THREE.Mesh(accessoryRingGeo, goldMaterial);
    ringB.position.set(2.0, -0.2, -0.5);
    ringB.scale.set(0.75, 0.75, 0.75);
    ringB.rotation.set(-0.5, 0.35, 0.8);
    accessoriesGroup.add(ringB);

    // Glowing Pearl Beads
    const pearlGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const p1 = new THREE.Mesh(pearlGeo, pearlMaterial);
    p1.position.set(-0.9, 1.9, -1.0);
    accessoriesGroup.add(p1);

    const p2 = new THREE.Mesh(pearlGeo, pearlMaterial);
    p2.position.set(1.5, 2.0, -1.3);
    p2.scale.set(0.85, 0.85, 0.85);
    accessoriesGroup.add(p2);

    const p3 = new THREE.Mesh(pearlGeo, pearlMaterial);
    p3.position.set(-1.3, -1.7, -0.4);
    p3.scale.set(0.65, 0.65, 0.65);
    accessoriesGroup.add(p3);

    scene.add(accessoriesGroup);
    objects.accessories = accessoriesGroup;

    // ==========================================
    // 8. BRONZE & GOLD SHIMMER DUST PARTICLES
    // Depth: 1-2px background parallax
    // ==========================================
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc68a5c,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    sceneRef.current = { renderer, scene, camera, objects, particles };

    // --- Mouse Parallax Handler (Normalized -1 to +1) ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / width - 0.5) * 2;
      mouseRef.current.targetY = -(clientY / height - 0.5) * 2;
    };

    // Mobile Device Orientation / Gyroscope Parallax
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseRef.current.targetX = Math.min(Math.max(e.gamma / 30, -1), 1);
        mouseRef.current.targetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth cubic-bezier spring lerp to cursor position
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Camera subtle perspective tilt (1-2px depth layer)
      camera.position.x = mx * 0.35;
      camera.position.y = my * 0.25;
      camera.lookAt(0, 0, 0);

      // --- Individual Object Movement and Parallax Depths ---
      // 1. Hairdryer (large object: 10-20px parallax, horizontal drift + slow rotation)
      if (objects.hairdryer) {
        objects.hairdryer.position.x = 3.0 + Math.sin(time * 0.5) * 0.1 + mx * 0.45;
        objects.hairdryer.position.y = 0.85 + Math.cos(time * 0.65) * 0.12 + my * 0.4;
        objects.hairdryer.rotation.y = -0.65 + time * 0.2 + mx * 0.15;
        objects.hairdryer.rotation.x = -0.25 + Math.sin(time * 0.4) * 0.05;
      }

      // 4. Cosmetic Serum Vial (depth movement, 10-20px parallax)
      if (objects.serum) {
        objects.serum.position.x = 2.5 + mx * 0.45;
        objects.serum.position.y = -1.4 + Math.sin(time * 0.7 + 2.0) * 0.12 + my * 0.38;
        objects.serum.position.z = 0.9 + Math.cos(time * 0.5) * 0.1;
        objects.serum.rotation.y = -0.4 + time * 0.16 + mx * 0.15;
      }

      // 5. Brass Comb (center lower: 10-15px parallax)
      if (objects.comb) {
        objects.comb.position.x = 0.7 + mx * 0.3;
        objects.comb.position.y = -2.5 + Math.cos(time * 0.6) * 0.09 + my * 0.25;
        objects.comb.rotation.z = -0.25 + Math.sin(time * 0.4) * 0.07;
      }

      // 6. Hairbrush
      if (objects.brush) {
        objects.brush.position.x = -1.8 + mx * 0.35;
        objects.brush.position.y = -2.1 + Math.sin(time * 0.7) * 0.1 + my * 0.28;
        objects.brush.rotation.y = -0.5 + Math.cos(time * 0.4) * 0.1;
      }

      // 7. Small Accessories & Pearl Pins (small objects: 20-30px parallax, fastest response)
      if (objects.accessories) {
        objects.accessories.rotation.y = time * 0.09 + mx * 0.25;
        objects.accessories.position.y = Math.sin(time * 0.6) * 0.14 + my * 0.65;
        objects.accessories.position.x = mx * 0.7;
      }

      // 8. Dust Drift
      if (particles) {
        particles.rotation.y = time * 0.015;
        particles.rotation.x = time * 0.008;
      }

      // Spotlight follow
      accentSpot.position.x = 3 + mx * 1.6;
      accentSpot.position.y = 4 + my * 1.6;

      renderer.render(scene, camera);
      sceneRef.current.reqId = requestAnimationFrame(animate);
    };

    sceneRef.current.reqId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current.reqId) {
        cancelAnimationFrame(sceneRef.current.reqId);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current.camera) {
      sceneRef.current.camera.position.y = -scrollProgress * 2;
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
