import { navItems } from "../assets/data";
import { EditMode } from "../models/models";
import clsx from "clsx";
import { ArrowCircleLeft } from "@mui/icons-material";

interface Props {
  currMode: EditMode;
  onChangeMode: (m: EditMode) => void;
  visible: boolean;
}

const Navigation = ({ currMode, onChangeMode, visible }: Props) => {
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
