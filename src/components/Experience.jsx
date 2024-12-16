import { Float, OrbitControls, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Clouds } from "./Clouds";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { TextSection } from "./TextSection";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { usePlay } from "../contexts/Play";
import gsap from "gsap";

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

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(()=>{
    return new THREE.CatmullRomCurve3(curvePoints,false,"catmullrom",0.5);
  },[]);

  const textSections = useMemo(()=>{
    return[{
      cameraRailDist: -3,
      position: new THREE.Vector3(
        curvePoints[1].x - 4,
        curvePoints[1].y + 1,
        curvePoints[1].z
      ),
      linkKey: "welcome",
      title:'Welcome',
      subtitle: 'to CodeMaps, Your personalised roadmap for coding',
  },
  {
      cameraRailDist: 4,
      position: new THREE.Vector3(
        curvePoints[2].x + 4,
        curvePoints[2].y,
        curvePoints[2].z + 10
      ),
      title:'Coding',
      subtitle: 'is an art form, a passion, and a creative outlet',
  },
  {
    cameraRailDist: -7,
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
        curvePoints[1].z + 220
      ),
      scale: new THREE.Vector3(2,2,1),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 10,
        curvePoints[1].y - 4 ,
        curvePoints[1].z + 235
      ),
      scale: new THREE.Vector3(1.2,1.2,1),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 9,
        curvePoints[1].y + 5,
        curvePoints[1].z + 220
      ),
      scale: new THREE.Vector3(1.7,1.5,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 20,
        curvePoints[1].y + 4,
        curvePoints[1].z + 215
      ),
      scale: new THREE.Vector3(1.7,1.8,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 15,
        curvePoints[1].y - 3,
        curvePoints[1].z + 190
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 15,
        curvePoints[1].y - 5,
        curvePoints[1].z + 150
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 10,
        curvePoints[1].y + 6,
        curvePoints[1].z + 160
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 10,
        curvePoints[1].y + 6,
        curvePoints[1].z + 170
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 18,
        curvePoints[1].y,
        curvePoints[1].z + 185
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 12,
        curvePoints[1].y,
        curvePoints[1].z + 185
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 4,
        curvePoints[1].y,
        curvePoints[1].z + 170
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 4,
        curvePoints[1].y,
        curvePoints[1].z + 120
      ),
      scale: new THREE.Vector3(1.5,1.7,2),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 20,
        curvePoints[1].y,
        curvePoints[1].z + 100
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 1,
        curvePoints[1].y,
        curvePoints[1].z + 100
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 15,
        curvePoints[1].y,
        curvePoints[1].z + 75
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 2,
        curvePoints[1].y,
        curvePoints[1].z + 50
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 2,
        curvePoints[1].y,
        curvePoints[1].z + 20
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 2,
        curvePoints[1].y + 4,
        curvePoints[1].z + 10
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x - 12,
        curvePoints[1].y - 4,
        curvePoints[1].z - 20
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 12,
        curvePoints[1].y - 4,
        curvePoints[1].z - 30
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 2,
        curvePoints[1].y + 4,
        curvePoints[1].z - 45
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 20,
        curvePoints[1].y - 4,
        curvePoints[1].z - 80
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 75,
        curvePoints[1].y - 4,
        curvePoints[1].z - 130
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 60,
        curvePoints[1].y + 4,
        curvePoints[1].z - 105
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 90,
        curvePoints[1].y - 4,
        curvePoints[1].z - 130
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 40,
        curvePoints[1].y + 4,
        curvePoints[1].z - 140
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 60,
        curvePoints[1].y - 4,
        curvePoints[1].z - 170
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 70,
        curvePoints[1].y + 4,
        curvePoints[1].z - 170
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 112,
        curvePoints[1].y - 4,
        curvePoints[1].z - 220
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
    {
      position: new THREE.Vector3(
        curvePoints[1].x + 120,
        curvePoints[1].y - 4,
        curvePoints[1].z - 250
      ),
      scale: new THREE.Vector3(1.2,1.2,1.8),
    },
  ],
  []);

  const shape = useMemo(()=>
  {
    const shape = new THREE.Shape(); 
    shape.moveTo(0,-0.08);
    shape.lineTo(0,0.08);

    return shape;
  })


  const cameraGroup = useRef();
  const cameraRail = useRef();
  const scroll = useScroll();
  const camera = useRef();

  const {play , end, setEnd} = usePlay();

  useFrame((_state, delta) => {

    if(window.innerWidth > window.innerHeight) {
      camera.current.fov = 30;
      camera.current.position.z = 5;
    }else{
      camera.current.fov = 0;
      camera.current.position.z = 2;
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (play && !end && sceneOpacity.current < 1){
      sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current,1,delta * 0.2);
    }

    if (end && sceneOpacity.current > 0){
      sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current,0,delta * 0.5);
    }

    if (end){
      return;
    }

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

    if (cameraGroup.current.position.z < curvePoints[curvePoints.length - 1].z + 100) {
      console.log("End condition met");
      setEnd(true);
      planeOutTl.current?.play();
    }
    

  });
  
  const onClickHandle = () => {
    window.location.href = "https://youtube.com";
  };

  const airplane = useRef();
  
  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    if (!airplane.current || !cameraRail.current) return;
  
    planeInTl.current = gsap.timeline({ paused: true });
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });
  
    planeOutTl.current = gsap.timeline({ paused: true });
    planeOutTl.current
      .to(
        airplane.current.position,
        {
          duration: 10,
          z: -250,
          y: 10,
        },
        0
      )
      .to(
        cameraRail.current.position,
        {
          duration: 8,
          y: 12,
        },
        0
      )
      .to(airplane.current.position, {
        duration: 1,
        z: -1000,
      });
  }, []);
  

  useEffect(() => {
    if(play){
      planeInTl.current.play();
    }

  }, );

  return (
    <>

      <directionalLight position={[0,3,1]} intensity={.4}/>

      {/*<OrbitControls/>*/}
      <group ref={cameraGroup}>
      <Background/>
      <group ref={cameraRail}>
      <PerspectiveCamera ref={camera} position={[0,0,5]} fov={30} makeDefault={true}/>
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
        <Clouds sceneOpacity={sceneOpacity} {...clouds} key={index} />
      ))
    }

<group position-y={-3}>
  <mesh>
    <extrudeGeometry 
      args={[
        shape, 
        {
          steps: LINE_NB_POINTS,
          bevelEnabled: false,
          extrudePath: curve,
        }
      ]}
    />
    <meshStandardMaterial ref={lineMaterialRef} color={"white"} onBeforeCompile={fadeOnBeforeCompile} />
  </mesh>
</group>

    </>
  );
};