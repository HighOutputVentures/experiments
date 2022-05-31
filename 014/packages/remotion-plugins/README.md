- `Player`

  ```typescript
  import {Player, PlayerRef} from "@remotion/player";
  import {Sequence} from "remotion";

  function MyVideo() {
    return (
      <>
        <Sequence from={0}>Hello</Sequence>
        ...
      </>
    );
  }

  export default function Component() {
    return (
      <Player
        fps={30}
        durationInFrames={30 * 30}
        component={MyVideo}
        compositionWidth={650}
        compositionHeight={550}
        controls
        inputProps={
          {
            /* props to be passed down to `MyVideo` component  */
          }
        }
      />
    );
  }
  ```

- `useAudioData`

  ```typescript
  import {useAudioData, visualizeAudio} from "@remotion/media-utils";

  export default function Component() {
    const audioData = useAudioData(audio);

    if (!audioData) return <>Failed to get audio info</>;

    console.log(
      audioData.channelWaveforms, // [Float32Array, Float32Array]
      audioData.durationInSeconds, // number
      audioData.isRemote, // boolean
      audioData.numberOfChannels, // number
      audioData.resultId, // string
      audioData.sampleRate // number
    );

    return (
      <>
        <pre>{JSON.stringify(audioData, null, 4)}</pre>
      </>
    );
  }
  ```

- `visualizeAudio`

  ```typescript
  import {useAudioData, visualizeAudio} from "@remotion/media-utils";
  import {useCurrentFrame, useVideoConfig} from "remotion";

  export default function Component() {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const audioData = useAudioData(audio);
    const visualization = visualizeAudio({
      fps,
      frame,
      audioData,
      numberOfSamples: 8,
    });

    console.log(visualization); // Array with length of `numberOfSamples`

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        {visualization.map((value) => (
          <div
            style={{
              width: 16,
              height: value * 10,
              backgroundColor: "blue",
            }}
          />
        ))}
      </div>
    );
  }
  ```

- `usePlayingState`

  ```typescript
  import {usePlayingState} from "remotion/dist/timeline-position-state";

  export default function Component() {
    const [state, setState] = usePlayingState();

    console.log(state); // boolean

    const fn = () => {
      setState(<boolean>)
    }

    ...
  }
  ```
