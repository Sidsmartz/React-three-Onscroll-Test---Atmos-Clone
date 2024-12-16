import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { fadeOnBeforeCompile } from '../utils/fadeMaterial';
import { useFrame } from '@react-three/fiber';

export function Clouds({ sceneOpacity, ...props }) {
  const { nodes, materials } = useGLTF('/models/gltfsforreact.glb');

  const materialRef = useRef();

  useFrame(()=>{
    materialRef.current.opacity = sceneOpacity.current
    });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball008.geometry}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          transparent
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/gltfsforreact.glb');
