/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\public\models\gltfsforreact.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/gltfsforreact.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball008.geometry} material={nodes.Mball008.material} position={[3.055, 0, 0]} scale={0.314} />
    </group>
  )
}

useGLTF.preload('/gltfsforreact.glb')
