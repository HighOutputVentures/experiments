import * as React from "react";
import {Sequence, useCurrentFrame} from "remotion";

interface ExampleProps {
  text?: string;
  controls?: boolean;
  setControls?: (value: boolean) => void;
}

export default function Example({text, controls, setControls}: ExampleProps) {
  const frame = useCurrentFrame();

  const second = frame / 30; // second * fps = currentFrame

  React.useEffect(() => {}, []);

  return (
    <div>
      <Sequence from={0}>
        <Wrapper>
          {text && text.trim().length > 0 ? text : "Random string"}
        </Wrapper>
      </Sequence>

      <Sequence from={30 * 10} durationInFrames={30 * 5}>
        <div className="absolute bottom-24 right-0 border-l-4 border-amber-700 bg-zinc-700 bg-opacity-50 p-4 text-sm">
          Ads in {Math.ceil(15 - second)}
        </div>
      </Sequence>

      <Sequence from={30 * 15} durationInFrames={30 * 5}>
        <div>Playing ad</div>
      </Sequence>
    </div>
  );
}

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return <div className="p-4">{children}</div>;
};
