import { Float, OrbitControls, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Clouds } from "./Clouds";
import { useMemo, useRef } from "react";
import * as THREE from 'three';
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 15000;

export const Experience = () => {

  const curve = useMemo(()=>{
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2,0,-10),
      new THREE.Vector3(-3,0,-20),
      new THREE.Vector3(0,0,-30),
      new THREE.Vector3(5,0,-40),
      new THREE.Vector3(7,0,-50),
      new THREE.Vector3(5,0,-60),
      new THREE.Vector3(0,0,-70),
      new THREE.Vector3(0,0,-80),
      new THREE.Vector3(0,0,-90),
      new THREE.Vector3(0,0,-100),
    ],false,"catmullrom",0.5)
  },[])

  const shape = useMemo(()=>
  {
    const shape = new THREE.Shape();
    shape.moveTo(0,-0.2);
    shape.lineTo(0,0.2);

    return shape;
  })

  const linePoints = useMemo(()=>{
    return curve.getPoints(LINE_NB_POINTS);
  },[curve])

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    )
    const curPoint = linePoints[curPointIndex];
    const pointAhead = linePoints[Math.min(curPointIndex + 1,linePoints.length - 1)]

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    //Math.PI /2 = Left
    //Math.PI = Right
    const angleRotation = (xDisplacement < 0 ? 1 : -1) * Math.min(Math.abs(xDisplacement), Math.PI/3);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation,
      )
    )

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z,
      )
    )

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta*2);
    cameraGroup.current.position.lerp(curPoint, delta*24)

    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta*2);

  });
  
  const airplane = useRef();

  return (
    <>
      {/*<OrbitControls enableZoom={false}  /> */}
      <group ref={cameraGroup}>
      <Background/>
      <PerspectiveCamera position={[0,0,5]} fov={30} makeDefault={true}/>

      <group ref = {airplane}>
        <Float floatIntensity={2} speed={2}>
        <Airplane rotation-y ={Math.PI/2} scale={[0.2,0.2,0.2]} position-y={0.1} />
        </Float>
      </group>
      </group>

            {/*Text*/}
            <group position={[-3,0,-20]}>
      <Text
        color="white"
        anchorX={"left"}
        anchorY="middle"
        fontSize={0.22}
        maxWidth = {2.5}
        >
        Welcome to Codemap!{"\n"}
        Your personalized roadmap for coding. 
      </Text>
      </group>
      

      <Clouds opacity={0.7} scale={[0.3,0.3,0.3]} rotation-y={Math.PI/9} position = {[2,0.2,-2]} />
      <Clouds opacity={0.4} scale={[0.1,0.2,0.4]} rotation-y={Math.PI/6} position = {[10,0.3,-20]} />
      <Clouds opacity={0.6} scale={[0.4,0.4,0.4]} rotation-y={Math.PI/6} position = {[-10,0.3,-20]} />
      <Clouds opacity={0.6} scale={[0.7,0.7,0.5]} rotation-y={Math.PI/6} position = {[-10,-5,-20]} />
      <Clouds opacity={0.7} scale={[0.8,0.8,0.8]} rotation-y={Math.PI/9} position = {[-1,-5,-52]} />

      <group position-y={-3}>
      {/*<Line
      points={linePoints}
      color={"white"}
      opacity={0.7}
      transparent
      linewidth={16}
      />*/}

        <mesh>
          <extrudeGeometry 
          args={[
            shape,
          {
            steps: LINE_NB_POINTS,
            bevelEnabled: false,
            extrudePath : curve,
          },]} />
        }
        <meshStandardMaterial color={"white"} opacity={0.7} transparent/>
        </mesh>

      </group>  
    </>
  );
};