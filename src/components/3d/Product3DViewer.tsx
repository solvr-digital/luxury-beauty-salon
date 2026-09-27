import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { LuxuryProduct } from '../../types';

interface Product3DViewerProps {
  product: LuxuryProduct;
  isHovered: boolean;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product, isHovered }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    productMeshGroup?: THREE.Group;
    spotlight?: THREE.SpotLight;
    reqId?: number;
    rotationTarget: { x: number; y: number };
    currentRotation: { x: number; y: number };
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
  }>({
    rotationTarget: { x: 0, y: 0 },
    currentRotation: { x: 0, y: 0 },
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio lighting for product photography
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xe5c378, 1.8, 6);
    bottomGlow.position.set(0, -2, 1);
    scene.add(bottomGlow);

    const spotlight = new THREE.SpotLight(0xffffff, 3.0, 10, Math.PI / 4, 0.3);
    spotlight.position.set(0, 4, 3);
    scene.add(spotlight);

    // Group to hold the product
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.productMeshGroup = productGroup;
    stateRef.current.spotlight = spotlight;

    // Build the specific 3D model for the selected product
    buildProductMesh(productGroup, product.id);

    // Mouse drag interaction
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.previousMousePosition.x;
        const deltaY = e.clientY - stateRef.current.previousMousePosition.y;
        stateRef.current.rotationTarget.y += deltaX * 0.01;
        stateRef.current.rotationTarget.x += deltaY * 0.01;
        stateRef.current.previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.isDragging = true;
        stateRef.current.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - stateRef.current.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - stateRef.current.previousMousePosition.y;
        stateRef.current.rotationTarget.y += deltaX * 0.012;
        stateRef.current.rotationTarget.x += deltaY * 0.012;
        stateRef.current.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth auto-rotation unless dragging
      if (!stateRef.current.isDragging) {
        stateRef.current.rotationTarget.y += 0.007;
      }

      // Smooth lerp to rotation target
      stateRef.current.currentRotation.x += (stateRef.current.rotationTarget.x - stateRef.current.currentRotation.x) * 0.08;
      stateRef.current.currentRotation.y += (stateRef.current.rotationTarget.y - stateRef.current.currentRotation.y) * 0.08;

      if (productGroup) {
        productGroup.rotation.y = stateRef.current.currentRotation.y;
        productGroup.rotation.x = stateRef.current.currentRotation.x;
        // Subtle floating breath
        productGroup.position.y = Math.sin(time * 1.5) * 0.06;
      }

      renderer.render(scene, camera);
      stateRef.current.reqId = requestAnimationFrame(animate);
    };

    stateRef.current.reqId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (stateRef.current.reqId) {
        cancelAnimationFrame(stateRef.current.reqId);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [product.id]);

  // Adjust spotlight & elevation on hover
  useEffect(() => {
    if (stateRef.current.spotlight) {
      stateRef.current.spotlight.intensity = isHovered ? 4.5 : 2.5;
    }
  }, [isHovered]);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-[360px] md:h-[460px]" />
    </div>
  );
};

// Helper: Procedural 3D luxury geometry builder
function buildProductMesh(group: THREE.Group, productId: string) {
  // Clear any existing children
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
  }

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4af37,
    metalness: 0.94,
    roughness: 0.16,
    clearcoat: 0.9,
    reflectivity: 0.98,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.15,
    transmission: 0.92,
    transparent: true,
    opacity: 0.88,
    ior: 1.52,
    thickness: 1.6,
  });

  const ceramicMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5efe8,
    roughness: 0.35,
    metalness: 0.1,
    clearcoat: 0.6,
  });

  if (productId === 'serum') {
    // Serum Dropper Bottle
    const vialGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.8, 36);
    const vial = new THREE.Mesh(vialGeo, glassMat);

    const liquidGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.45, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      transmission: 0.8,
      roughness: 0.1,
      transparent: true,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.15;

    const shoulderGeo = new THREE.CylinderGeometry(0.3, 0.55, 0.3, 32);
    const shoulder = new THREE.Mesh(shoulderGeo, glassMat);
    shoulder.position.y = 1.05;

    const collarGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.35, 32);
    const collar = new THREE.Mesh(collarGeo, goldMat);
    collar.position.y = 1.35;

    const bulbGeo = new THREE.SphereGeometry(0.24, 24, 24);
    bulbGeo.scale(0.9, 1.3, 0.9);
    const bulbMat = new THREE.MeshPhysicalMaterial({ color: 0xfffcf7, roughness: 0.3 });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 1.75;

    group.add(vial, liquid, shoulder, collar, bulb);
    group.scale.set(1.15, 1.15, 1.15);
  } else if (productId === 'perfume') {
    // Luxury Extrait Perfume Flask
    const bottleGeo = new THREE.BoxGeometry(1.3, 1.6, 0.7);
    const bottle = new THREE.Mesh(bottleGeo, glassMat);

    const liquidGeo = new THREE.BoxGeometry(1.1, 1.3, 0.52);
    const roseLiquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x9e2a2b,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      ior: 1.4,
    });
    const liquid = new THREE.Mesh(liquidGeo, roseLiquidMat);
    liquid.position.y = -0.05;

    const collarGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.35, 32);
    const collar = new THREE.Mesh(collarGeo, goldMat);
    collar.position.y = 1.0;

    const capGeo = new THREE.BoxGeometry(0.7, 0.6, 0.6);
    const cap = new THREE.Mesh(capGeo, glassMat);
    cap.position.y = 1.5;

    group.add(bottle, liquid, collar, cap);
    group.scale.set(1.1, 1.1, 1.1);
  } else if (productId === 'hair-oil') {
    // Hair Oil Flacon
    const flaconGeo = new THREE.CylinderGeometry(0.5, 0.65, 2.0, 36);
    const flacon = new THREE.Mesh(flaconGeo, glassMat);

    const amberLiquidGeo = new THREE.CylinderGeometry(0.42, 0.58, 1.75, 32);
    const oilMat = new THREE.MeshPhysicalMaterial({
      color: 0xdfa032,
      roughness: 0.15,
      transmission: 0.88,
      transparent: true,
    });
    const liquid = new THREE.Mesh(amberLiquidGeo, oilMat);
    liquid.position.y = -0.1;

    const pumpGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.45, 32);
    const pump = new THREE.Mesh(pumpGeo, goldMat);
    pump.position.y = 1.25;

    const spoutGeo = new THREE.BoxGeometry(0.5, 0.15, 0.2);
    const spout = new THREE.Mesh(spoutGeo, goldMat);
    spout.position.set(0.18, 1.5, 0);

    group.add(flacon, liquid, pump, spout);
    group.scale.set(1.05, 1.05, 1.05);
  } else {
    // Moisturizer Cream Jar
    const jarGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.9, 36);
    const jar = new THREE.Mesh(jarGeo, ceramicMat);

    const goldLidGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.3, 36);
    const lid = new THREE.Mesh(goldLidGeo, goldMat);
    lid.position.y = 0.6;

    const goldBaseRingGeo = new THREE.TorusGeometry(0.9, 0.03, 16, 36);
    const baseRing = new THREE.Mesh(goldBaseRingGeo, goldMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -0.44;

    group.add(jar, lid, baseRing);
    group.scale.set(1.2, 1.2, 1.2);
  }
}
