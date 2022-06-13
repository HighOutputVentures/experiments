import {
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import constants from "../../config/constants";
import IBirthdayCard from "../../types/birthday-card";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";

export default function BirthdayCard(data: IBirthdayCard) {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const startFrame = durationInFrames - (constants.lastSlideDuration + 2) * fps;

  const volume = interpolate(frame, [startFrame, durationInFrames], [0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Audio src={staticFile("/ringtone.mp3")} startFrom={0} volume={volume} />

      <div className="flex w-full flex-col items-center bg-[#0f0f0f] p-8 text-white">
        <Slide1 data={data} />
        <Slide2 data={data} />
        <Slide3 data={data} />
      </div>
    </>
  );
}
