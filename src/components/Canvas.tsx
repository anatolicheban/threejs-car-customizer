import { useEffect, useRef } from "react";
import { Experience } from "../Experience/Experience";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef }: Props) => {
  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
