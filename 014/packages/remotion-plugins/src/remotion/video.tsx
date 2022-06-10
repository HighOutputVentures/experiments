import {AbsoluteFill, Composition, getInputProps} from "remotion";

export function Video() {
  const props = getInputProps();

  return (
    <Composition
      id="Video"
      fps={30}
      width={640}
      height={640}
      component={Component}
      durationInFrames={15 * 5}
      defaultProps={props}
    />
  );
}

function Component(props: Record<string, unknown>) {
  return (
    <AbsoluteFill className="items-center justify-center bg-white">
      <code className="bg-gray-100 p-8 font-monospace">
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </code>
    </AbsoluteFill>
  );
}
