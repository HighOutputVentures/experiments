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
    <AbsoluteFill
      style={{
        color: "#000",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <code
        style={{
          padding: "2rem",
          fontFamily: "monospace",
          backgroundColor: "#FFEDD5",
        }}
      >
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </code>
    </AbsoluteFill>
  );
}
