import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Clouds({ opacity, ...props }) {
  const { nodes, materials } = useGLTF('/models/gltfsforreact.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball008.geometry}>
        <meshStandardMaterial
          onBeforeCompile={(shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              'vec4 diffuseColor = vec4(diffuse, opacity);',
              `
              float fadeDistance = 200.0;
              float distance = length(vViewPosition);
              float fadeOpacity = smoothstep(fadeDistance, 0.0, distance);
              vec4 diffuseColor = vec4(diffuse, fadeOpacity * opacity);
              `
            );
          }}
          transparent
          opacity={opacity}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/gltfsforreact.glb');
