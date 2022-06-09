import React from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import DonutIcon from "../icons/donut";
import ScribbleIcon from "../icons/scribble";

const Confetto: React.FC<{
  delay: number;
  x: string;
  size: number;
  type: string;
}> = ({delay, x, size, type}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();

  const drop = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 1000,
      mass: 50,
    },
  });

  const top = interpolate(drop, [0, 1], [-0.2, 1.5]);

  return (
    <>
      {type === "scribble" && (
        <ScribbleIcon
          x={x}
          size={type === "scribble" ? size / 2 : size}
          top={top}
        />
      )}

      {type === "donut" && <DonutIcon x={x} size={size / 2} top={top} />}
    </>
  );
};

export default Confetto;
