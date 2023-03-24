import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  progress: number | "ready";
}

const Preloader = ({ progress }: Props) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number;

    if (progress === "ready") {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = "0";
        loaderRef.current.style.scale = "1.2";
      }

      timer = setTimeout(() => {
        if (loaderRef?.current) loaderRef.current.style.display = "none";
      }, 2500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [progress]);

  return (
    <div ref={loaderRef} className="preloader">
      <div className="preloader-content">
        <span>
          <div
            style={{ width: progress === "ready" ? "100%" : `${progress}%` }}
            className="progress"
          ></div>
        </span>
        <p>{progress === "ready" ? "100%" : `${progress}%`}</p>
      </div>
    </div>
  );
};

export default Preloader;
