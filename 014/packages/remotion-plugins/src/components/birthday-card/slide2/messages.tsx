import * as React from "react";
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from "remotion";
import {v4 as uuid} from "uuid";
import IMessage from "../../../types/message";
import Message from "./message";

export default function Messages({data}: {data: IMessage[]}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <React.Fragment>
      {data.map((msg, index) => {
        const duration = fps * 5;
        const startsAtFrame = index > 0 ? duration * index : index;
        const exitsAtFrame = startsAtFrame + duration - 15;

        const opacityFadeIn = interpolate(
          frame,
          [startsAtFrame, startsAtFrame + 15],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const opacityFadeOut = interpolate(
          frame,
          [exitsAtFrame, exitsAtFrame + 15],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <Sequence
            from={startsAtFrame}
            durationInFrames={duration}
            key={msg.id}
          >
            <Message
              data={msg}
              key={uuid()}
              className="left-1/2 -translate-x-1/2"
              style={{
                opacity: frame >= exitsAtFrame ? opacityFadeOut : opacityFadeIn,
              }}
            />
          </Sequence>
        );
      })}
    </React.Fragment>
  );
}
