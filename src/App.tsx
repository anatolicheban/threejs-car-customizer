import { useEffect, useRef } from "react";
import Canvas from "./components/Canvas";
import GeneralInterface from "./components/GeneralInterface";
import Navigation from "./components/Navigation";
import { Experience } from "./Experience/Experience";

function App() {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  let experience: Experience;

  useEffect(() => {
    experience = new Experience(canvasRef?.current);
  }, []);

  return (
    <>
      <Canvas canvasRef={canvasRef} />
      <Navigation />
      <GeneralInterface />
    </>
  );
}

export default App;
