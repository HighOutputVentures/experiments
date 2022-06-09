import {Player} from "@remotion/player";
import {ThreeCanvas} from "@remotion/three";
import Head from "next/head";
import * as React from "react";
import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export default function RemotionThreeExample() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <React.Fragment>
      <Head>
        <title>@remotion/three</title>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center">
        {loading && <div className="text-sm text-gray-400">Loading...</div>}
        {!loading && (
          <div className="border border-gray-100">
            <Player
              fps={30}
              compositionHeight={500}
              compositionWidth={500}
              component={Component}
              durationInFrames={30 * 10}
              autoPlay
              loop
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function Component() {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  return (
    <ThreeCanvas
      width={width}
      height={height}
      orthographic={false}
      camera={{
        fov: 75,
        position: [0, 0, 300],
      }}
    >
      <ambientLight intensity={0.15} />
      <pointLight args={[undefined, 0.4]} position={[200, 200, 0]} />
      <mesh
        position={[0, 0, 0]}
        rotation={[frame * 0.06 * 0.5, frame * 0.07 * 0.5, frame * 0.08 * 0.5]}
        scale={interpolate(Math.sin(frame / 10), [-1, 1], [0.8, 1.2])}
      >
        <boxGeometry args={[100, 100, 100]} />
        <meshStandardMaterial
          color={[
            Math.sin(frame * 0.12) * 0.5 + 0.5,
            Math.cos(frame * 0.11) * 0.5 + 0.5,
            Math.sin(frame * 0.08) * 0.5 + 0.5,
          ]}
        />
      </mesh>
    </ThreeCanvas>
  );
}
