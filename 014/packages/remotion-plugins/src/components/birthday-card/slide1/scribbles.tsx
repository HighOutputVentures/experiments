import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from "remotion";
import {Scribble1} from "../../icons/scribble1";
import {Scribble2} from "../../icons/scribble2";
import {Scribble3} from "../../icons/scribble3";
import {Scribble4} from "../../icons/scribble4";
import {Scribble5} from "../../icons/scribble5";
import {Scribble6} from "../../icons/scribble6";

export default function Scribbles() {
  const frame = useCurrentFrame();
  const duration = 5;
  const startFrame = 86;
  const step = 18;

  const negate = (n: number) => n * -1;

  return (
    <AbsoluteFill>
      <Sequence from={startFrame}>
        <Scribble1
          height={90}
          style={{
            position: "absolute",
            top: 12.5,
            left: negate(
              interpolate(
                frame,
                [startFrame, startFrame + duration],
                [200, 100],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
        <Scribble4
          height={120}
          style={{
            position: "absolute",
            right: -200,
            top: negate(
              interpolate(
                frame,
                [startFrame, startFrame + duration],
                [100, 0],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
      </Sequence>

      <Sequence from={startFrame + step}>
        <Scribble2
          height={120}
          style={{
            position: "absolute",
            top: "40%",
            left: negate(
              interpolate(
                frame,
                [startFrame + step, startFrame + step + duration],
                [200, 125],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
        <Scribble5
          height={100}
          style={{
            position: "absolute",
            top: "45%",
            right: negate(
              interpolate(
                frame,
                [startFrame + step, startFrame + step + duration],
                [200, 180],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
      </Sequence>

      <Sequence from={startFrame + step * 2}>
        <Scribble3
          height={90}
          style={{
            position: "absolute",
            top: "80%",
            left: negate(
              interpolate(
                frame,
                [startFrame + step * 2, startFrame + step * 2 + duration],
                [250, 172],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
        <Scribble6
          height={100}
          style={{
            position: "absolute",
            top: "75%",
            right: negate(
              interpolate(
                frame,
                [startFrame + step * 2, startFrame + step * 2 + duration],
                [180, 140],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              ),
            ),
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
}
