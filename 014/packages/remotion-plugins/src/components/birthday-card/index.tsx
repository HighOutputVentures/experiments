import IBirthdayCard from "~/types/birthday-card";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";

export default function BirthdayCard({celebrant, messages}: IBirthdayCard) {
  return (
    <>
      {/* <Audio src={staticFile("ringtone.mp3")} startFrom={0} volume={0.2} /> */}

      <div className="flex w-full flex-col items-center bg-[#0f0f0f] p-8 text-white">
        <Slide1 data={celebrant} />
        <Slide2 data={messages} />
        <Slide3 />
      </div>
    </>
  );
}
