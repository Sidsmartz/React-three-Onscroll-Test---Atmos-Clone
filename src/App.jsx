import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.jsx";
import { ScrollControls } from "@react-three/drei";
function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["#c1c1c1"]} />
        <ScrollControls pages={100} damping={1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;