import {Player} from "@remotion/player";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import {Sequence, spring, useCurrentFrame, useVideoConfig} from "remotion";

export default function SpringExample() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>spring</title>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading && <div className="text-sm text-gray-400">Loading...</div>}
        {!loading && (
          <div className="border border-gray-100">
            <Player
              fps={30}
              durationInFrames={30 * 3}
              component={Component}
              compositionWidth={400}
              compositionHeight={400}
              controls
              autoPlay
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function Component() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const mt = spring({
    fps,
    frame,
    from: -10,
    to: 50,
    config: {
      mass: 1, // the weight. reducing this will make animation faster
      damping: 10,
      stiffness: 100, // affects how bouncy is the animation
      overshootClamping: false,
    },
  });

  return (
    <div>
      <Sequence from={0}>
        <div
          className="absolute left-1/2 h-16 w-16 -translate-x-1/2"
          style={{
            marginTop: `${mt}%`,
          }}
        >
          <Image src="/hov-logo-dark.png" alt="" width={48} height={48} />
        </div>
      </Sequence>
    </div>
  );
}
