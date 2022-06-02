import {Player, PlayerRef} from "@remotion/player";
import * as React from "react";
import Example from "../components/example";
import TextField from "../components/textfield";

export default function RemotionVideo() {
  const [text, setText] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);
  const playerRef = React.useRef<PlayerRef>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputRef.current;
    const player = playerRef.current;

    if (!(input && player)) return;

    player.seekTo(0);
    setText(input.value);
    input.value = "";
    input.focus();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="bg-zinc-800 shadow-md">
          <Player
            ref={playerRef}
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

        <form onSubmit={handleSubmit}>
          <TextField
            ref={inputRef}
            className="mt-14 block w-full"
            placeholder="Random string"
          />
        </form>
      </div>
    </div>
  );
}
