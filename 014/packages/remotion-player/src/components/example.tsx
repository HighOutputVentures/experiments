import * as React from "react";
import {Sequence, useCurrentFrame} from "remotion";

interface ExampleProps {
  text?: string;
  controls?: boolean;
  setControls?: (value: boolean) => void;
}

export default function Example({text, controls, setControls}: ExampleProps) {
  const frame = useCurrentFrame();

  // second * fps = currentFrame
  const second = frame / 30;
  const notifyIncomingAd = second >= 5 && second < 10;
  const playAd = second >= 10 && second <= 14;

  React.useEffect(() => {}, []);

  return (
    <div>
      <Sequence from={0}>
        <Wrapper>
          {text && text.trim().length > 0 ? text : "Random string"}
        </Wrapper>
      </Sequence>

      {playAd && <div>Playing ad</div>}

      {notifyIncomingAd && (
        <div className="absolute bottom-24 right-0 border-l-4 border-amber-700 bg-zinc-700 bg-opacity-50 p-4 text-sm">
          Ads in {Math.ceil(10 - second)}
        </div>
      )}
    </div>
  );
}

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return <div className="p-4">{children}</div>;
};
