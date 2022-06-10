import {AbsoluteFill, Img, Sequence, staticFile} from "remotion";
import IBirthdayCard from "../../../types/birthday-card";
import Donuts from "./donuts";
import Messages from "./messages";
import Scribbles from "./scribbles";

export default function Slide2({data}: {data: IBirthdayCard}) {
  return (
    <Sequence from={300}>
      <AbsoluteFill className="items-center bg-white p-8 text-black">
        <div className="mx-auto flex items-center gap-2">
          <Img
            className="h-4 w-4"
            src={staticFile("hov-logo-dark.png")}
            alt=""
          />

          <h2>High Output Ventures</h2>
        </div>

        <main className="z-10 grow overflow-hidden p-4">
          <Messages data={data.messages} />
        </main>
      </AbsoluteFill>
      <Scribbles />
      <Donuts />
    </Sequence>
  );
}
