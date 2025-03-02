"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Node {
  x: number;
  y: number;
  z: number;
  // Optionally add other properties like object?: string;
}

interface ThreeSceneProps {
  nodes: Node[];
  movementData?: any; // Replace with a more specific type if needed.
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ nodes, movementData }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const scene = new THREE.Scene();
    // Set background to white:
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Add OrbitControls for rotation, panning, and zooming.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooths out camera movements.
    controls.dampingFactor = 0.05;

    // Add blue sphere nodes.
    nodes.forEach((node) => {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(node.x, node.y, node.z);
      scene.add(sphere);
    });

    // Animation loop.
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, [nodes, movementData]);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default ThreeScene;
