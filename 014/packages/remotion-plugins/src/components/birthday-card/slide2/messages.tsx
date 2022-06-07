import clsx from "clsx";
import Image from "next/image";
import * as React from "react";
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from "remotion";
import {v4 as uuid} from "uuid";
import IMessage from "~/types/message";

export default function Messages({data}: {data: IMessage[]}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <React.Fragment>
      {data.map((msg, index) => {
        const duration = fps * 5;
        const startsAtFrame = index > 0 ? duration * index : index;

        const opacityFadeIn = interpolate(
          frame,
          [startsAtFrame, startsAtFrame + 15],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const shouldFadeOut = startsAtFrame + duration - 15;
        const opacityFadeOut = interpolate(
          frame,
          [shouldFadeOut, shouldFadeOut + 15],
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
                opacity: shouldFadeOut ? opacityFadeOut : opacityFadeIn,
              }}
            />
          </Sequence>
        );
      })}
    </React.Fragment>
  );
}

interface MessageProps {
  data: IMessage;
}

const Message = ({
  data,
  className,
  ...props
}: MessageProps & Omit<React.ComponentProps<"div">, "children">) => {
  return (
    <div
      key={uuid()}
      className={clsx(
        className,
        "absolute top-[50%] flex w-[65%] translate-y-[-50%] flex-col gap-[1rem] rounded-md bg-zinc-800 p-6 text-white shadow-md",
      )}
      {...props}
    >
      <div className="flex gap-2">
        <div className="relative h-[40px] w-[40px] shrink-0 grow-0">
          <Image layout="fill" src="/robot.svg" alt="" />
        </div>

        <div>
          <p className="text-xs text-gray-300 line-clamp-1">
            Greetings from <span className="text-blue-400">@{data.author}</span>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: data.body,
            }}
          />
        </div>
      </div>
    </div>
  );
};
