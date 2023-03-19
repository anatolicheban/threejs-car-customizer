import { useEffect, useState } from "react";
import { colorTargets } from "../assets/data";
import { ColorTarget } from "../models/models";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import clsx from "clsx";
import { Slider } from "@mui/material";

const GeneralInterface = () => {
  const [currTarget, setCurrTarget] = useState<ColorTarget>("body");
  const [color, setColor] = useColor("hex", "#121212");

  const targetBtnHandler = (value: ColorTarget) => {
    setCurrTarget(value);
  };

  useEffect(() => {
    console.log(color);
    // setColor({ hex: "#5ecb44" });
  }, []);

  return (
    <div className="general-interface">
      <h3 className="title">General</h3>
      <ul className="targets-list">
        {colorTargets.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                targetBtnHandler(item);
              }}
              className={clsx(item === currTarget ? "active" : null)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <div className="property --color">
        <span>Color</span>
        <ColorPicker
          width={256}
          height={150}
          color={color}
          onChange={setColor}
          hideHSV
          hideRGB
          dark
        />
        ;
      </div>
      <div className="property --metalness">
        <span>Metalness</span>
        <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
      </div>
      <div className="property">
        <span>Roughness</span>
        <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
      </div>
      {currTarget === "glass" && (
        <div className="property">
          <span>Opacity</span>
          <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
        </div>
      )}
    </div>
  );
};

export default GeneralInterface;
