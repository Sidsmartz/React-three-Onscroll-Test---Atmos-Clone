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
const FRICTION_DISTANCE = 42;

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
      cameraRailDist: -1,
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
      cameraRailDist: 1.5,
      position: new THREE.Vector3(
        curvePoints[2].x + 4,
        curvePoints[2].y,
        curvePoints[2].z + 10
      ),
      title:'Coding',
      subtitle: 'is an art form, a passion, and a creative outlet',
  },
  {
    cameraRailDist: -1,
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


  const clouds = useMemo(()=>[
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 10,
        curvePoints[1].y ,
        curvePoints[1].z + 220
      ),
      scale: new THREE.Vector3(1,1.2,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 4,
        curvePoints[1].y - 4 ,
        curvePoints[1].z + 235
      ),
      scale: new THREE.Vector3(1.2,1.2,1),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 4,
        curvePoints[1].y - 2 ,
        curvePoints[1].z 
      ),
      scale: new THREE.Vector3(2,2,1),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 10,
        curvePoints[1].y - 2 ,
        curvePoints[1].z + 235
      ),
      scale: new THREE.Vector3(1.2,1.2,1),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 12,
        curvePoints[1].y ,
        curvePoints[1].z + 220
      ),
      scale: new THREE.Vector3(1.7,1.2,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[2].x + 10,
        curvePoints[2].y + 10,
        curvePoints[2].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[3].x + 20,
        curvePoints[3].y + 5,
        curvePoints[3].z -2
      ),
      scale: new THREE.Vector3(0.7,0.7,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[3].x - 20,
        curvePoints[3].y - 5,
        curvePoints[3].z -2
      ),
      scale: new THREE.Vector3(0.7,0.7,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[4].x + 10,
        curvePoints[4].y + 10,
        curvePoints[4].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[4].x - 10,
        curvePoints[4].y + 10,
        curvePoints[4].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[5].x + 10,
        curvePoints[5].y + 10,
        curvePoints[5].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7),
    },
    {
      position: new THREE.Vector3(
        curvePoints[5].x - 10,
        curvePoints[5].y + 10,
        curvePoints[5].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[6].x + 10,
        curvePoints[6].y + 10,
        curvePoints[6].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[6].x - 10,
        curvePoints[6].y + 10,
        curvePoints[6].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    },
    {
      position: new THREE.Vector3(
        curvePoints[7].x + 10,
        curvePoints[7].y + 10,
        curvePoints[7].z
      ),
      scale: new THREE.Vector3(0.5,1,0.7)
    }
  ],
  []);

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
  const cameraRail = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {

    const scrollOffset = Math.max(0,scroll.offset);

    const curPoint = curve.getPoint(scrollOffset);

    const lookAtpoint = curve.getPoint(
      Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    let resetCameraRail = true;
    textSections.forEach((TextSection)=>{
      const distance = TextSection.position.distanceTo(cameraGroup.current.position);
      if(distance < FRICTION_DISTANCE){
        const targetCameraRailPosition = new THREE.Vector3(
          (1 - distance / FRICTION_DISTANCE) * TextSection.cameraRailDist,
          0,
          0,
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if(resetCameraRail){
      const targetCameraRailPosition = new THREE.Vector3(0,0,0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

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
      <group ref={cameraRail}>
      <PerspectiveCamera position={[0,0,5]} fov={30} makeDefault={true}/>
      </group>

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
    {
      clouds.map((clouds, index) => (
        <Clouds {...clouds} key={index} />
      ))
    }

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