import * as React from "react";
import constants from "~/config/constants";
import useStore from "~/hooks/use-store";

export function useDurationInFrames() {
  const store = useStore();
  const [loading, setLoading] = React.useState(true);
  const [durationInFrames, setDurationInFrames] = React.useState(0);

  const calcDIF = React.useCallback(() => {
    const totalMessages = store.data?.messages.length ?? 0;

    const firstSlideDuration = constants.slideOneDuration * constants.FPS;
    const messageDuration = constants.messageDuration * constants.FPS;
    const lastSlideDuration = constants.lastSlideDuration * constants.FPS;

    setDurationInFrames(
      messageDuration * totalMessages + firstSlideDuration + lastSlideDuration,
    );
    setLoading(false);
  }, [store.data?.messages.length]);

  React.useEffect(() => {
    calcDIF();
  }, [calcDIF]);

  React.useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, []);

  return {
    loading,
    durationInFrames,
  };
}
