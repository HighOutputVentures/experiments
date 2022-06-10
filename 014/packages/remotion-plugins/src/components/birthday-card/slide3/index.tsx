import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import constants from "../../../config/constants";
import useStore from "../../../hooks/use-store";

export default function Slide3() {
  const store = useStore();
  const {fps} = useVideoConfig();

  const totalMessages = store.data?.messages.length ?? 0;
  const slide1Duration = constants.slideOneDuration * constants.FPS;
  const slide2Duration =
    constants.messageDuration * constants.FPS * totalMessages;

  return (
    <Sequence
      from={slide1Duration + slide2Duration}
      durationInFrames={constants.lastSlideDuration * fps}
    >
      <AbsoluteFill className="items-center justify-center bg-black text-white">
        <Img src={staticFile("hov-logo.png")} width={80} />
        <p className="mt-4 text-lg">Thanks for watching!</p>
      </AbsoluteFill>
    </Sequence>
  );
}
