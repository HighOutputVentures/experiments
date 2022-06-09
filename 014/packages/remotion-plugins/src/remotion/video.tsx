import {
  AbsoluteFill,
  Composition,
  Loop,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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

const colors = ["#67E8F9", "#22D3EE", "#06B6D4", "#0891B2"];

function Component() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Loop durationInFrames={30 * 5}>
      <AbsoluteFill
        style={{
          backgroundColor: "white",
        }}
      >
        {colors.map((backgroundColor, to) => {
          const marginLeft = spring({
            frame,
            fps,
            from: 0,
            to,
            config: {
              overshootClamping: false,
              stiffness: 60,
            },
          });

          return (
            <Square
              key={backgroundColor}
              style={{
                backgroundColor,
                marginLeft: `${marginLeft * 15}%`,
              }}
            />
          );
        })}
      </AbsoluteFill>
    </Loop>
  );
}

const Square = styled.div`
  height: 300px;
  width: 100px;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
`;
