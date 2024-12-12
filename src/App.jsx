import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.jsx";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Noise } from "lamina";
function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["#c1c1c1"]} />
        <ScrollControls pages={100} damping={1}>
          <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.5} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;