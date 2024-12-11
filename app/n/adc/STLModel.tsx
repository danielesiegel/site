"use client";

import React, { useRef, useEffect } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import * as THREE from 'three';

const STLModel: React.FC = () => {
  // Load the geometry using useLoader with correct type arguments
  const geometry = useLoader(STLLoader, "/doc.stl") as BufferGeometry;

  // Create a ref for the THREE.Group instance
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const { scene } = useThree();

  useEffect(() => {
    if (geometry) {
      // Compute bounding box and center
      geometry.computeBoundingBox();
      const center = geometry.boundingBox?.getCenter(new Vector3());
      const size = geometry.boundingBox?.getSize(new Vector3());

      if (center) {
        geometry.translate(-center.x, -center.y, -center.z);
      }

      // Scale the geometry to fit within the view
      const maxDimension = Math.max(size?.x || 1, size?.y || 1, size?.z || 1);
      if (maxDimension > 0) {
        geometry.scale(1 / maxDimension, 1 / maxDimension, 1 / maxDimension);
      }

      // Create the mesh and add it to the group
      const mesh = new Mesh(
        geometry,
        new MeshStandardMaterial({
          color: "#D9DDDC",
          metalness: 0.2,
          roughness: 0.8,
        })
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      groupRef.current.add(mesh);
    }

    // Add group to the scene
    if (groupRef.current) {
      scene.add(groupRef.current);
    }

    return () => {
      // Cleanup the group from the scene
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
    };
  }, [geometry, scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Rotate the group
    }
  });

  return null; // No JSX element output; handled via scene
};

export default STLModel;
