import * as React from "react";
import useStore from "../use-store";

export function useDurationInFrames() {
  const store = useStore();
  const [loading, setLoading] = React.useState(true);
  const [durationInFrames, setDurationInFrames] = React.useState(0);

  const calcDIF = React.useCallback(() => {
    const totalMessages = store.data?.messages.length ?? 0;

    // calc logic
    const firstSlideDuration = 0;
    const messageDuration = 0;

    setDurationInFrames(messageDuration * totalMessages + firstSlideDuration);
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
