import {ArrowRightIcon} from "@heroicons/react/outline";
import {Player} from "@remotion/player";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import {Img, interpolate, Sequence, useCurrentFrame} from "remotion";

export default function Landing() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Remotion Expirement</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <main className="flex grow flex-col items-center justify-center">
          <div>
            <Player
              component={Balloon}
              compositionHeight={600}
              compositionWidth={500}
              fps={30}
              durationInFrames={30 * 60 * 60}
              autoPlay
              loop
            />
          </div>
        </main>
      </div>
    </>
  );
}

function Balloon() {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="relative h-[600px] w-[500px]">
      <div className="absolute left-1/2 top-[25%] flex -translate-x-1/2 items-center justify-center">
        <Sequence from={0} layout="none">
          <Img
            draggable={false}
            src="/balloons.svg"
            alt=""
            width={300}
            height={400}
            style={{
              transform: `scale(${scale})`,
            }}
          />
        </Sequence>
      </div>

      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
        <Sequence from={10} layout="none">
          <Link href="/create-new" passHref>
            <a className="flex h-min w-fit items-center gap-4 rounded-md border border-gray-200 p-3 px-5 text-sm outline-none transition-all duration-300 hover:border-gray-300 focus:border-blue-400">
              <span>Create birthday video</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Link>
        </Sequence>
      </div>
    </div>
  );
}
