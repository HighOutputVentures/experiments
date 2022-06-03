import {
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export default function Intro() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const config = {
    mass: 1, // the weight. reducing this will make animation faster
    damping: 10,
    stiffness: 100, // affects how bouncy is the animation
    overshootClamping: false,
  };

  const mt = spring({
    fps,
    frame,
    from: -10,
    to: 50,
    config,
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
          <Img src={staticFile("hov-logo.png")} />
        </div>
      </Sequence>
    </div>
  );
}
