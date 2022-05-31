import {useAudioData, visualizeAudio} from "@remotion/media-utils";
import * as React from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  interpolateColors,
  Loop,
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
      <Sequence from={0} showInTimeline={playingAd}>
        <Ringtone />

        <Loop durationInFrames={50}>
          <AnimatedText>
            {text && text.trim().length > 0 ? text : "Random string"}
          </AnimatedText>
        </Loop>
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
      <div className="absolute left-1/2 top-32 z-50 flex h-[50px] -translate-x-1/2 items-end gap-2">
        {visualization.map((v) => (
          <div
            key={uuid()}
            className="w-4 bg-gradient-to-r from-blue-600 to-indigo-400"
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
  const frame = useCurrentFrame();
  const [handle] = React.useState(() => delayRender());
  const [loading, setLoading] = React.useState(true);

  const color = interpolateColors(frame, [0, 50], ["#22D3EE", "#F43F5E"]);

  const doSomethingSync = React.useCallback(async () => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/users");
    } catch (error) {
    } finally {
      setLoading(false);
      continueRender(handle);
    }
  }, []);

  React.useEffect(() => {
    doSomethingSync();
  }, []);

  if (loading) return null;

  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <h2 style={{color}} className="font-mono text-6xl text-transparent">
        {children}
      </h2>

      {/* <h2 className="bg-gradient-to-r from-red-400 to-amber-600 bg-clip-text font-mono text-6xl text-transparent">
        {children}
      </h2> */}
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
