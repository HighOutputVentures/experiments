import * as React from "react";
import {AbsoluteFill, Sequence, useCurrentFrame, Video} from "remotion";
import video from "../assets/ad.mp4";

interface ExampleProps {
  text?: string;
}

export default function Example({text}: ExampleProps) {
  return (
    <div>
      <Sequence from={0}>
        <AnimatedText>
          {text && text.trim().length > 0 ? text : "Random string"}
        </AnimatedText>
      </Sequence>
      <Sequence from={30 * 10} durationInFrames={30 * 5}>
        <IncomingAdMsg />
      </Sequence>
      <Sequence from={30 * 15} durationInFrames={30 * 5}>
        <Ad />
      </Sequence>
    </div>
  );
}

function AnimatedText({children}: {children: React.ReactNode}) {
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <h2 className="bg-gradient-to-r from-red-400 to-amber-600 bg-clip-text font-mono text-6xl text-transparent">
        {children}
      </h2>
    </div>
  );
}

function IncomingAdMsg() {
  const frame = useCurrentFrame();
  const second = frame / 30; // second * fps = currentFrame

  console.log(second);

  return (
    <div className="absolute bottom-24 right-0 border-l-4 border-amber-700 bg-zinc-700 bg-opacity-50 p-4 text-sm">
      Ads in {Math.ceil(5 - second)}
    </div>
  );
}

function Ad() {
  return (
    <AbsoluteFill className="items-center justify-center">
      <Video src={video} className="w-full" />
    </AbsoluteFill>
  );
}
