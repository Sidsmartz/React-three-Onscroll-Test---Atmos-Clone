import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";


function App() {
const {play, end} = usePlay();

  return (
    <>
      <Canvas>
        <ScrollControls pages={play && !end ? 20 : 0} damping={0.5}>
          <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.22} />
        </EffectComposer>
      </Canvas>
      <Overlay/>
    </>
  );
}

export default App;