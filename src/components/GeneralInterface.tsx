import { useEffect, useState } from "react";
import { colorTargets } from "../assets/data";
import { GenTarget } from "../models/models";
import { HexColorPicker } from "react-colorful";
import clsx from "clsx";
import { Slider } from "@mui/material";
import { Experience } from "../Experience/Experience";

interface Props {
  exp: Experience | null;
  visible: boolean;
}

const GeneralInterface = ({ exp, visible }: Props) => {
  const [currTarget, setCurrTarget] = useState<GenTarget>("body");

  const [color, setColor] = useState("#aabbcc");
  const [metalness, setMetalness] = useState(0);
  const [roughness, setRoughness] = useState(0);

  const targetBtnHandler = (value: GenTarget) => {
    setCurrTarget(value);
  };

  let updateMaterial = () => {
    exp?.world.car?.setProps(currTarget, {
      color,
      metalness,
      roughness,
    });
  };

  useEffect(() => {
    let props = exp?.world.car.getProperties(currTarget);

    if (props) {
      setColor("#" + props.color);
      setMetalness(props.metalness);
      setRoughness(props.roughness);
    }
  }, [exp, currTarget]);

  return (
    <div className={clsx("general-interface", visible ? null : "hidden")}>
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
        <span>Color</span>;
        <HexColorPicker
          className="color-palette"
          color={color}
          onChange={(color) => {
            setColor(color);
            updateMaterial();
          }}
        />
        ;
      </div>
      <div className="property --metalness">
        <span>Metalness</span>
        <Slider
          min={0}
          max={1}
          step={0.01}
          size="small"
          defaultValue={70}
          value={metalness}
          onChange={(e, newVal) => {
            setMetalness(newVal as number);
            updateMaterial();
          }}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
      </div>
      <div className="property">
        <span>Roughness</span>
        <Slider
          min={0}
          max={1}
          step={0.01}
          size="small"
          defaultValue={70}
          value={roughness}
          onChange={(e, newVal) => {
            setRoughness(newVal as number);
            updateMaterial();
          }}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
};

export default GeneralInterface;
