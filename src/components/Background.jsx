import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial side={THREE.BackSide}>
          <Gradient
            colorA="#357ca1"
            colorB="red"
            axes="y"
            start={-0.5}
            end={0.5}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};