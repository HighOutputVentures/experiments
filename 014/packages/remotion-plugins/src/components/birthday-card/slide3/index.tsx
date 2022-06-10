import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import constants from "../../../config/constants";
import IBirthdayCard from "../../../types/birthday-card";

export default function Slide3({data}: {data: IBirthdayCard}) {
  const {fps} = useVideoConfig();

  const totalMessages = data.messages.length ?? 0;
  const slide1Duration = constants.slideOneDuration * constants.FPS;
  const slide2Duration =
    constants.messageDuration * constants.FPS * totalMessages;

  return (
    <Sequence
      from={slide1Duration + slide2Duration}
      durationInFrames={constants.lastSlideDuration * fps}
    >
      <AbsoluteFill>
        <Sequence from={0}>
          <Background />
        </Sequence>
        <Sequence from={10}>
          <Logo />
        </Sequence>
        <Sequence from={30}>
          <Caption />
        </Sequence>
      </AbsoluteFill>
    </Sequence>
  );
}

function Caption() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const marginLeft = spring({frame, fps, from: -100, to: 0});

  return (
    <p
      className="absolute left-1/2 top-[55%] -translate-x-1/2 text-lg opacity-75"
      style={{
        marginLeft: `${marginLeft}px`,
      }}
    >
      Thanks for watching!!
    </p>
  );
}

function Background() {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="absolute h-full w-full bg-black text-white"
      style={{
        transform: `scale(${scale})`,
      }}
    />
  );
}

function Logo() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const top = spring({frame, fps, from: -5, to: 40});

  return (
    <Img
      className="absolute left-1/2 w-[80px] -translate-x-1/2"
      src={staticFile("hov-logo.png")}
      style={{
        top: `${top}%`,
      }}
    />
  );
}
