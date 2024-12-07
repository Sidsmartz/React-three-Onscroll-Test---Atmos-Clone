/* Command: npx gltfjsx@6.5.3 .\public\models\gltfsforreact.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Clouds({opacity, ...props}) {
  const { nodes, materials } = useGLTF('/models/gltfsforreact.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball008.geometry} >
      <meshStandardMaterial
      {...materials['lambert2SG.001']}
      transparent
      opacity={opacity}
      envMapIntensity={2}
      />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/gltfsforreact.glb')
