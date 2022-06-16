import {useCallback, useEffect, useState} from "react";
import {
  AbsoluteFill,
  Composition,
  continueRender,
  delayRender,
  getInputProps,
} from "remotion";
import BirthdayCard from "../components/birthday-card";
import constants from "../config/constants";
import IBirthdayCard from "../types/birthday-card";

export function Video() {
  const props = getInputProps();

  const [handle] = useState(() => delayRender());

  const [data, setData] = useState<IBirthdayCard>();
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    const endpoint = `${constants.apiEndpoint}/birthdayCards/${props.id}`;

    try {
      const response = await fetch(endpoint);
      const json = await response.json();

      setData(json);
    } catch (e) {
      setError(true);
    } finally {
      continueRender(handle);
    }
  }, [handle, props.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <Failed />;
  if (!data) return null;

  return (
    <div className="border border-gray-100">
      <Composition
        id="Video"
        fps={constants.FPS}
        durationInFrames={getDurationInFrames(data.messages.length)}
        component={BirthdayCard}
        width={640}
        height={640}
        defaultProps={data}
      />
    </div>
  );
}

export function getDurationInFrames(totalMsg: number) {
  const firstSlideDuration = constants.slideOneDuration * constants.FPS;
  const messageDuration = constants.messageDuration * constants.FPS;
  const lastSlideDuration = constants.lastSlideDuration * constants.FPS;
  return messageDuration * totalMsg + firstSlideDuration + lastSlideDuration;
}

function Failed() {
  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <p>Video is broken</p>
    </AbsoluteFill>
  );
}
