import clsx from "clsx";
import { stickersList, stickerTargets } from "../assets/data";
import { useEffect, useState } from "react";
import { SticksBtn, SticksTarget } from "../models/models";
import { Experience } from "../Experience/Experience";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface Props {
  active: boolean;
  exp: Experience | null;
  update: number;
}

const StickersInterface = ({ active, exp, update }: Props) => {
  const [currTarget, setCurrTarget] = useState<SticksTarget>("leftDoor");

  const [currIndex, setCurrIndex] = useState<number | "none">("none");

  const targetBtnHandler = (target: SticksTarget) => {
    setCurrTarget(target);
  };

  const toggleStickers = (type: SticksBtn) => {
    if (type === "back") {
      setCurrIndex((prev) => {
        if (prev === 0) {
          return "none";
        }
        if (prev === "none") {
          return stickersList.length - 1;
        }
        return prev - 1;
      });
    } else {
      setCurrIndex((prev) => {
        if (prev === stickersList.length - 1) {
          return "none";
        }
        if (prev === "none") {
          return 0;
        }
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (exp?.world.car.currSticks[currTarget].stick) {
      setCurrIndex(exp?.world.car.currSticks[currTarget].stick as number | "none");
    }
  }, [exp, currTarget, update]);

  useEffect(() => {
    if (active) {
      exp?.camera.configurate({ mode: "stickers", target: currTarget });
    }
  }, [exp, active, currTarget]);

  useEffect(() => {
    exp?.world.car.setStick(currIndex, currTarget);
  }, [currIndex]);

  return (
    <div className={clsx("stickers-interface", active ? null : "hidden")}>
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
      <div className="toggles">
        <button
          onClick={() => {
            toggleStickers("back");
          }}
          className="arrow-back"
        >
          <ArrowLeft />
        </button>
        <p>
          {currIndex === "none" ? "none" : stickersList.find((el) => el.index === currIndex)?.title}
        </p>
        <button
          onClick={() => {
            toggleStickers("next");
          }}
          className="arrow-next"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default StickersInterface;
