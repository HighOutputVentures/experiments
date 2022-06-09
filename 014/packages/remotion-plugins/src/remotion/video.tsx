import {AbsoluteFill, Composition, Loop} from "remotion";
import styled from "styled-components";

export function Video() {
  return (
    <Composition
      id="Video"
      fps={30}
      width={640}
      height={640}
      component={Component}
      durationInFrames={15 * 30}
    />
  );
}

function Component() {
  return (
    <Loop durationInFrames={30 * 5}>
      <AbsoluteFill
        style={{
          backgroundColor: "white",
        }}
      >
        <Ball />
      </AbsoluteFill>
    </Loop>
  );
}

const Ball = styled.div`
  font-size: 4rem;
  font-weight: bolder;
  background-color: #f97316;
  height: 12rem;
  width: 12rem;
  border-radius: 100%;
`;
