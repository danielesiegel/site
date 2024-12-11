// src/components/STLViewer.tsx
"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import STLModel from "./STLModel";
import * as THREE from "three";

const Lights: React.FC = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Create Hemisphere Light
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    // Create Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 10, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Create Shadow Floor
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const shadowFloor = new THREE.Mesh(planeGeometry, shadowMaterial);
    shadowFloor.receiveShadow = true;
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -1;
    scene.add(shadowFloor);

    // Cleanup on unmount
    return () => {
      scene.remove(hemisphereLight);
      scene.remove(directionalLight);
      scene.remove(shadowFloor);
      hemisphereLight.dispose();
      directionalLight.dispose();
      shadowFloor.geometry.dispose();
      shadowFloor.material.dispose();
    };
  }, [scene]);

  return null; // No JSX output; lights are added imperatively
};

const STLViewer: React.FC = () => {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        style={{ width: "100%", height: "500px" }}
        camera={{ position: [4, 4, 4], fov: 15 }}
      >
        {/* Add Lights */}
        <Lights />

        {/* Model */}
        <Suspense fallback={<Html><div>Loading 3D Model...</div></Html>}>
          <STLModel />
        </Suspense>

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default STLViewer;
