import { Float, OrbitControls, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Clouds } from "./Clouds";
import { useMemo, useRef } from "react";
import * as THREE from 'three';
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { TextSection } from "./TextSection";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

const links = {
  welcome: "https://youtube.com/"
}

export const Experience = () => {

  const curvePoints = useMemo(() => 
  [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0,0,-CURVE_DISTANCE),
    new THREE.Vector3(100,0,-2 * CURVE_DISTANCE),
    new THREE.Vector3(-100,0,-3 * CURVE_DISTANCE),
    new THREE.Vector3(0,0,-4 * CURVE_DISTANCE),
    new THREE.Vector3(0,0,-5 * CURVE_DISTANCE),
    new THREE.Vector3(0,0,-6 * CURVE_DISTANCE),
    new THREE.Vector3(0,0,-7 * CURVE_DISTANCE),
    ],
      []
    );

  const curve = useMemo(()=>{
    return new THREE.CatmullRomCurve3(curvePoints,false,"catmullrom",0.5);
  },[]);

  const textSections = useMemo(()=>{
    return[{
      position: new THREE.Vector3(
        curvePoints[1].x - 3,
        curvePoints[1].y,
        curvePoints[1].z
      ),
      linkKey: "welcome",
      title:'Welcome',
      subtitle: 'to CodeMaps, Your personalised roadmap for coding',
  },
  {
      position: new THREE.Vector3(
        curvePoints[2].x + 4,
        curvePoints[2].y,
        curvePoints[2].z + 10
      ),
      title:'Coding',
      subtitle: 'is an art form, a passion, and a creative outlet',
  },
  {
    position: new THREE.Vector3(
      curvePoints[3].x - 4,
      curvePoints[3].y,
      curvePoints[3].z + 10
    ),
    title:'Learning',
    subtitle: 'is a continuous journey, filled with uncertainty and challenges',
  }
];
},[]);

  const shape = useMemo(()=>
  {
    const shape = new THREE.Shape(); 
    shape.moveTo(0,-0.08);
    shape.lineTo(0,0.08);

    return shape;
  })

  const linePoints = useMemo(()=>{
    return curve.getPoints(LINE_NB_POINTS);
  },[curve])

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {

    const scrollOffset = Math.max(0,scroll.offset);

    const curPoint = curve.getPoint(scrollOffset);

    const lookAtpoint = curve.getPoint(
      Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    //Following the points
    cameraGroup.current.position.lerp(curPoint, delta*24)
    //Make group look at point ahead
    const currentLookat = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3().subVectors(curPoint,lookAtpoint).normalize();

    const lookAt = currentLookat.lerp(targetLookAt, delta*24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    //Airplane Rotation
    const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new THREE.Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0,1,0),-nonLerpLookAt.rotation.y
    )

    let angle = Math.atan2(-tangent.z, tangent.x);
      angle = -Math.PI/2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;

    angleDegrees *= 2.4;

    //LIMIT
    if(angleDegrees < 0){
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if(angleDegrees > 0){
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    //Set angle back to radians
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta*2);

  });
  
  const onClickHandle = () => {
    window.location.href = "https://youtube.com";
  };

  const airplane = useRef();

  return (
    <>

      <directionalLight position={[0,3,1]} intensity={.4}/>

      {/*<OrbitControls/>*/}
      <group ref={cameraGroup}>
      <Background/>
      <PerspectiveCamera position={[0,0,5]} fov={30} makeDefault={true}/>

      <group ref = {airplane}>
        <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
        <Airplane rotation-y ={Math.PI/2} scale={[0.2,0.2,0.2]} position-y={0.1} />
        </Float>
      </group>
      </group>

    {/*TEXT*/}
    {
  textSections.map((section, index) => (
    <TextSection {...section} key={index} />
  ))
}




    {/*Clouds*/}
    <Clouds scale={[.6,.6,1]} position={[-7,-1.2,-7]}/>
    <Clouds scale={[.4,.4,.6]} position={[3.5,-1,-10]} rotation-y={Math.PI} />
    <Clouds scale={[.4,.4,.4]} position={[-3.5,0.2,-12]} rotation-y={Math.PI/3}/>

    <Clouds scale={[.6,.6,.6]} position={[3.5,0.2,-12]} />

    <Clouds scale={[0.4,0.4,0.4]} rotation-y={Math.PI/9} position={[1,-0.2,-12]}/>
    <Clouds scale={[0.3,0.3,.3]} position={[-4,-0.5,-53]}/>


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
        <meshStandardMaterial color={"white"} transparent envMapIntensity={2}/>
        </mesh>

      </group>  
    </>
  );
};