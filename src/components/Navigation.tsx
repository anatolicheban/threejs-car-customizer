import { navItems } from "../assets/data";
import { ConfigData, EditMode } from "../models/models";
import clsx from "clsx";
import { ArrowCircleLeft, FileUpload, CameraAlt, FileDownload } from "@mui/icons-material";
import { Experience } from "../Experience/Experience";
import { useRef } from "react";

interface Props {
  currMode: EditMode;
  onChangeMode: (m: EditMode) => void;
  onConfigLoad: (config: ConfigData) => void;
  visible: boolean;
  exp: Experience | null;
  onScreenShot: () => void;
}

const Navigation = ({
  currMode,
  exp,
  onChangeMode,
  onScreenShot,
  onConfigLoad,
  visible,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  let uploadHandler = () => {
    exp?.uploadConfig();
  };

  let importBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.click();
  };

  let importFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;

    if (files?.length) {
      let file = files[0];

      let link = URL.createObjectURL(file);

      fetch(link)
        .then((res) => res.json())
        .then((res) => {
          onConfigLoad(res as ConfigData);
        });
    }

    e.target.value = "";
  };

  return (
    <>
      <div className={clsx("navigation", visible ? null : "hidden")}>
        <ul>
          {navItems.map(({ title, icon: Icon, mode }) => (
            <li key={title}>
              <button
                className={clsx(currMode === mode ? "active" : null)}
                onClick={() => {
                  onChangeMode(mode);
                }}
              >
                <Icon className="icon" />
                <p>{title}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="config">
          <button onClick={uploadHandler}>
            <FileUpload />
            <p>Export</p>
          </button>
          <button onClick={importBtnHandler}>
            <input
              onChange={importFileHandler}
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              ref={inputRef}
            />
            <FileDownload />
            <p>Import</p>
          </button>
          <button onClick={() => onScreenShot()}>
            <CameraAlt />
            <p>Screen</p>
          </button>
        </div>
      </div>
      <div
        className={clsx("back", visible ? "hidden" : null)}
        onClick={() => {
          onChangeMode("view");
        }}
      >
        <ArrowCircleLeft fontSize="inherit" />
      </div>
    </>
  );
};

export default Navigation;
