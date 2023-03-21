import clsx from "clsx";
import { stickerTargets } from "../assets/data";
import { useState } from "react";
import { SticksTarget } from "../models/models";

interface Props {
  visible: boolean;
}

const StickersInterface = ({ visible }: Props) => {
  const [currTarget, setCurrTarget] = useState<SticksTarget>("leftDoor");

  const targetBtnHandler = (target: SticksTarget) => {
    setCurrTarget(target);
  };

  return (
    <div className={clsx("stickers-interface", visible ? null : "hidden")}>
      <h3 className="title">Stickers</h3>
      <ul className="targets-list">
        {stickerTargets.map(({ title, type }) => (
          <li key={title}>
            <button
              onClick={() => {
                targetBtnHandler(type);
              }}
              className={clsx(type === currTarget ? "active" : null)}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StickersInterface;
