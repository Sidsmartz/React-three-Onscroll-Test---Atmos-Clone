import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play , end, setPlay} = usePlay();

  return (
    <div className={`overlay ${play ? "overlay-disable" : ""}`}>
      <div className={`loader ${progress === 100 ? "loader-disappear" : ""}`} />
      
      {progress === 100 && (
        <div className={`intro ${play ? "intro-disappear" : ""}`}>
          <h1 className="logo">CODEMAPS</h1>
          <button className="explore"
            onClick={()=>{
              setPlay(true);
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end? "outro-appear": ""}`}>
        <p className="outro-text">
          Thank you for exploring the interactive experience!
        </p>
      </div>
    </div>
  );
};
