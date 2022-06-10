import {AbsoluteFill, Composition, getInputProps} from "remotion";
import styled from "styled-components";

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
      <Code>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Code>
    </AbsoluteFill>
  );
}

const Code = styled.code`
  padding: 2rem;
  font-family: monospace;
  background-color: #ffedd5;
`;
