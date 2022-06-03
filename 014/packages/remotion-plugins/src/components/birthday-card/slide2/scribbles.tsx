import {AbsoluteFill} from "remotion";
import {Scribble1} from "../../icons/scribble1";
import {Scribble2} from "../../icons/scribble2";
import {Scribble3} from "../../icons/scribble3";
import {Scribble4} from "../../icons/scribble4";
import {Scribble5} from "../../icons/scribble5";
import {Scribble6} from "../../icons/scribble6";

export default function Scribbles() {
  return (
    <AbsoluteFill>
      <Scribble1
        height={50}
        style={{
          position: "absolute",
          top: 12.5,
          left: -100,
        }}
      />

      <Scribble4
        height={80}
        style={{
          position: "absolute",
          right: -220,
          top: 0,
        }}
      />

      <Scribble2
        height={80}
        style={{
          position: "absolute",
          top: "40%",
          left: -125,
        }}
      />

      <Scribble5
        height={60}
        style={{
          position: "absolute",
          top: "45%",
          right: -190,
        }}
      />

      <Scribble3
        height={70}
        style={{
          position: "absolute",
          top: "80%",
          left: -172,
        }}
      />

      <Scribble6
        height={60}
        style={{
          position: "absolute",
          top: "75%",
          right: -155,
        }}
      />
    </AbsoluteFill>
  );
}
