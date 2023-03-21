import { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import GeneralInterface from "./components/GeneralInterface";
import Navigation from "./components/Navigation";
import { Experience } from "./Experience/Experience";
import { EditMode } from "./models/models";

function App() {
  let [experience, setExperience] = useState<Experience | null>(null);
  let [editMode, setEditMode] = useState<EditMode>("view");

  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let exp = new Experience(canvasRef?.current);

    exp.resources.addHandler("ready", () => {
      setExperience(exp);
    });
  }, []);

  return (
    <>
      <Canvas canvasRef={canvasRef} />
      <Navigation
        visible={editMode === "view"}
        currMode={editMode}
        onChangeMode={(mode) => {
          setEditMode(mode);
        }}
      />
      <GeneralInterface visible={editMode === "general"} exp={experience} />
    </>
  );
}

export default App;
