import {Player, PlayerRef} from "@remotion/player";
import * as React from "react";
import Example from "../components/example";
import TextField from "../components/textfield";

export default function RemotionVideo() {
  const [text, setText] = React.useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="bg-zinc-800 shadow-md">
          <Player
            fps={30}
            durationInFrames={30 * 30}
            component={Example}
            compositionWidth={650}
            compositionHeight={550}
            controls
            inputProps={{
              text,
            }}
          />
        </div>

        <TextField
          className="mt-14 block w-full"
          placeholder="Random string"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
