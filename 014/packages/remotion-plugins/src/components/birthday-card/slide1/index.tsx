import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import Confetti from "~/components/confetti";
import constants from "~/config/constants";
import ICelebrant from "~/types/celebrant";
import dateFormatter from "~/utils/date-formatter";
import Donuts from "./donuts";
import Scribbles from "./scribbles";

export default function Slide1({data}: {data: ICelebrant}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

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
    [4 * multiplier, 4 * multiplier + (multiplier - 8)],
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
        <div className="my-8 h-[210px] w-[210px] overflow-hidden rounded-full">
          <Img
            src={data.image}
            alt=""
            style={{
              transform: `scale(${userPhotoScaleValue})`,
            }}
          />
        </div>
      </Sequence>

      <Sequence from={3 * multiplier} layout="none">
        <h2 className="text-[2rem]">{data.name}</h2>
      </Sequence>

      <Sequence from={4 * multiplier} layout="none">
        <p className="mt-2">{textToShow}</p>
      </Sequence>

      <Sequence from={5 * multiplier} layout="none">
        <p className="mt-8">
          {dateFormatter.format(new Date(data.dateOfBirth))}
        </p>
      </Sequence>

      <Sequence from={74}>
        <Donuts />
      </Sequence>

      <Scribbles />

      <Sequence from={125} durationInFrames={15}>
        <AbsoluteFill className="shine" />
      </Sequence>

      <Sequence from={100}>
        <Confetti />
      </Sequence>
    </Sequence>
  );
}
