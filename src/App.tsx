import { useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import Canvas from "./components/Canvas";
import GeneralInterface from "./components/GeneralInterface";
import Navigation from "./components/Navigation";
import StickersInterface from "./components/StickersInterface";
import { Experience } from "./Experience/Experience";
import { ConfigData, EditMode } from "./models/models";

function App() {
  let [experience, setExperience] = useState<Experience | null>(null);
  let [editMode, setEditMode] = useState<EditMode>("view");
  let [update, setUpdate] = useState(0);

  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let exp = new Experience(canvasRef?.current);

    exp.resources.addHandler("ready", () => {
      setExperience(exp);
    });
  }, []);

  useEffect(() => {
    if (editMode === "view") {
      experience?.camera.configurate({ mode: editMode });
    }
  }, [experience, editMode]);

  useIdleTimer({
    timeout: 10000,
    onActive: () => {
      if (experience) {
        experience.camera.controls.autoRotate = false;
      }
    },
    onIdle: () => {
      if (experience && experience.camera.controls.enabled) {
        experience.camera.controls.autoRotate = true;
      }
    },
  });

  const loadConfigHandler = (cfg: ConfigData) => {
    experience?.applyConfig(cfg);
    setUpdate(Math.random());
  };

  const screenShotHandler = () => {
    let canvas = document.querySelector("canvas") as HTMLCanvasElement;
    let a = document.createElement("a");
    a.download = "kek.png";
    a.href = canvas.toDataURL("image/png") as string;
    a.click();
  };

  return (
    <>
      <Canvas canvasRef={canvasRef} />
      <Navigation
        onScreenShot={screenShotHandler}
        onConfigLoad={loadConfigHandler}
        exp={experience}
        visible={editMode === "view"}
        currMode={editMode}
        onChangeMode={(mode) => {
          setEditMode(mode);
        }}
      />
      <GeneralInterface update={update} active={editMode === "general"} exp={experience} />
      <StickersInterface update={update} exp={experience} active={editMode === "stickers"} />
    </>
  );
}

export default App;
