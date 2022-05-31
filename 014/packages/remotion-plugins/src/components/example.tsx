import {useAudioData, visualizeAudio} from "@remotion/media-utils";
import * as React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import {usePlayingState} from "remotion/dist/timeline-position-state";
import {v4 as uuid} from "uuid";
import video from "../assets/ad.mp4";
import ringtone from "../assets/ringtone.mp3";

interface ExampleProps {
  text?: string;
}

export default function Example({text}: ExampleProps) {
  const frame = useCurrentFrame();
  const playsAdAt = 30 * 15;
  const stopsAdAt = playsAdAt + 30 * 5;
  const playingAd = playsAdAt >= frame && stopsAdAt <= frame;

  return (
    <div>
      {!playingAd && (
        <Sequence from={0}>
          <Ringtone />

          <AnimatedText>
            {text && text.trim().length > 0 ? text : "Random string"}
          </AnimatedText>
        </Sequence>
      )}

      <Sequence from={30 * 10} durationInFrames={30 * 5}>
        <IncomingAdMsg />
      </Sequence>
      <Sequence from={30 * 15} durationInFrames={30 * 5}>
        <Ad />
      </Sequence>
    </div>
  );
}

function Ringtone({paused}: {paused?: boolean}) {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const audioData = useAudioData(ringtone);
  const [playingState] = usePlayingState();

  if (!audioData) return null;

  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 8,
  });

  return (
    <>
      <div className="absolute left-1/2 top-32 flex h-[50px] -translate-x-1/2 items-end gap-2">
        {visualization.map((v) => (
          <div
            key={uuid()}
            className="w-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-400"
            style={{
              height: v * 25,
            }}
          />
        ))}
      </div>

      {playingState && <Audio src={ringtone} volume={0.5} />}
    </>
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
