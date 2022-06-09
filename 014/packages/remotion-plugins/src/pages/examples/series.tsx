import {Player} from "@remotion/player";
import Head from "next/head";
import * as React from "react";
import {
  AbsoluteFill,
  interpolateColors,
  Series,
  useCurrentFrame,
} from "remotion";

const durations = [30, 35, 40];

export default function SeriesSequenceExample() {
  const [duration, setDuration] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setDuration(durations.reduce((t, n) => t + n, 0));
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{"<Series />"}</title>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading && <div className="text-sm text-gray-400">Loading...</div>}
        {!loading && (
          <div className="border border-gray-100">
            <Player
              durationInFrames={duration}
              component={Component}
              fps={30}
              loop
              controls
              compositionHeight={400}
              compositionWidth={400}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function Component() {
  const array: [string, string][] = [
    ["#22D3EE", "#0284C7"],
    ["#E879F9", "#9333EA"],
    ["#FB923C", "#FB7185"],
  ];

  return (
    <Series>
      <Series.Sequence durationInFrames={durations[0]}>
        <Circle label="1" colors={array[0]} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={durations[1]}>
        <Circle label="2" colors={array[1]} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={durations[2]}>
        <Circle label="3" colors={array[2]} />
      </Series.Sequence>
    </Series>
  );
}

interface CircleProps {
  label: string;
  colors: [from: string, to: string];
}

function Circle({label, colors}: CircleProps) {
  const frame = useCurrentFrame();
  const backgroundColor = interpolateColors(frame, [0, 30], colors);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{backgroundColor}}
        className="flex h-[150px] w-[150px] items-center justify-center rounded-full text-[4rem] font-extrabold text-white"
      >
        {label}
      </div>
    </AbsoluteFill>
  );
}
