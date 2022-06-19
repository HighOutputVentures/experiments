import {ReactNode} from "react";
import {
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import Confetti from "../../../components/confetti";
import constants from "../../../config/constants";
import IBirthdayCard from "../../../types/birthday-card";
import dateFormatter from "../../../utils/date-formatter";
import Donuts from "./donuts";
import Scribbles from "./scribbles";

export default function Slide1({data}: {data: IBirthdayCard}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {celebrant} = data;

  const multiplier = 14;
  const charsShown =
    frame > 4 * multiplier ? Math.floor((frame - multiplier * 4) / 1.15) : 0;
  const textToShow = "May you have a wonderful day today!".slice(0, charsShown);

  const logoMarginTop = interpolate(frame, [0, multiplier - 8], [-48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const userPhotoScaleValue = interpolate(
    frame,
    [3 * multiplier, 3 * multiplier + 5],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <Sequence
      from={0}
      layout="none"
      durationInFrames={constants.slideOneDuration * fps}
    >
      <Sequence from={1} layout="none">
        <Img
          src={staticFile("hov-logo.png")}
          height={40}
          width={40}
          style={{marginTop: logoMarginTop}}
        />
      </Sequence>

      <Sequence from={multiplier} layout="none">
        <h2 className="mt-12 font-secondary text-[3rem]">Happy Birthday!</h2>
      </Sequence>

      <Sequence from={2 * multiplier} layout="none">
        <div className="my-8 h-[210px] w-[210px] shrink-0 grow-0 overflow-hidden rounded-full">
          <Img
            src={celebrant.image}
            width={210}
            height={210}
            alt=""
            style={{
              transform: `scale(${userPhotoScaleValue})`,
            }}
          />
        </div>
      </Sequence>

      <Sequence from={3 * multiplier} layout="none">
        <Name>{celebrant.name}</Name>
      </Sequence>

      <Sequence from={4 * multiplier} layout="none">
        <p className="mt-2">{textToShow}</p>
      </Sequence>

      <Sequence from={5 * multiplier} layout="none">
        <p className="mt-8">
          {dateFormatter.format(new Date(celebrant.dateOfBirth))}
        </p>
      </Sequence>

      <Sequence from={74}>
        <Donuts />
      </Sequence>

      <Scribbles />

      <Sequence from={100}>
        <Confetti />
      </Sequence>

      <Sequence from={200} durationInFrames={15}>
        <style jsx>{`
          .shine::after {
            content: "";
            top: 0;
            transform: translateX(100%);
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            animation: slide 1s;
            background: -moz-linear-gradient(
              left,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.212) 50%,
              rgba(128, 186, 232, 0) 99%,
              rgba(125, 185, 232, 0) 100%
            );
            background: -webkit-gradient(
              linear,
              left top,
              right top,
              color-stop(0%, rgba(255, 255, 255, 0)),
              color-stop(50%, rgba(255, 255, 255, 0.212)),
              color-stop(99%, rgba(128, 186, 232, 0)),
              color-stop(100%, rgba(125, 185, 232, 0))
            );
            background: -webkit-linear-gradient(
              left,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.212) 50%,
              rgba(128, 186, 232, 0) 99%,
              rgba(125, 185, 232, 0) 100%
            );
            background: -o-linear-gradient(
              left,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.212) 50%,
              rgba(128, 186, 232, 0) 99%,
              rgba(125, 185, 232, 0) 100%
            );
          }

          @keyframes slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>

        <div className="shine" />
      </Sequence>
    </Sequence>
  );
}

function Name({children}: {children: ReactNode}) {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [0, 30], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <h2
      className="h-[44px] overflow-hidden text-center text-[2rem]"
      style={{width: `${width}%`}}
    >
      {children}
    </h2>
  );
}
