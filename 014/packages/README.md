## Remotion

<br>
<br>

**Components/Hooks/Utils**

- [x] `Composition` is used to register a component to be displayed as video.
- [x] `Sequence` a component that lets you control what component(s) appear on your video based on the frame.
- [x] `AbsoluteFill` automatically centers a component in the screen
- [x] `Img` can be used instead of `img` to ensure that a particular image gets loaded before frame is rendered
- [x] `staticFile` is typically used to import assets eg. images under `src/public`
- [x] `Audio` component to be used when rendering an audio which accepts a lot of useful props
- [x] `useCurrentFrame` returns the current frame index/number
- [x] `useVideoConfig` returns the video settings. `fps`, `durationInFrames`, `width`, `height`, `id`, `defaultProps`. More info [here](https://www.remotion.dev/docs/use-video-config)
- [x] `interpolate` helps in creating animations. Example if we want a `fade in` effect, it will generate an opacity value for us to be used at a certain point of time
- [x] `Video` component wraps native `video` element and accepts all of its props excluding `autoplay` and `controls`. Also comes with additional props `endsAt` and `startsFrom` (which do exactly what thier name sounds)
- [ ] `spring`

**Plugins**

- [ ] `@remotion/player`
- [ ] `@remotion/three`
- [ ] `@remotion/lambda`

<br>
<br>

**How Tos**

- How to use `Composition`

  - using composition is pretty straight forward. you just have to invoke it inside your entry point which is `src/index.ts` then pass in the required props.

  <br>

  ```typescript
  import {Composition} from "remotion";
  import {AwesomeComponent} from "./awesome-component";

  export const Video = () => {
    return (
      <>
        <Composition
          id="AwesomeComponent"
          component={AwesomeComponent}
          width={1080}
          height={1080}
          fps={30}
          durationInFrames={30 * 10}
        />
      </>
    );
  };
  ```

- How to use `AbsoluteFill`
  <br>

```typescript
export const Component = () => {
  return (
    <AbsoluteFill>
      <SomeComponent />
    </AbsoluteFill>
  );
};
```

> using absolute fill is equivalent to having a `div` with the ff. styles below

```css
.absolute-fill {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

- How to use `Sequence`

  - To use the `Sequence` component you just need to import it from `remotion` package and use it inside your custom components
    <br><br>

  ```typescript
  import {Sequence} from 'remotion';

  const MyComponent = () => {
  	return (
  		<>
  			<Sequence from={<number>}>...</Sequence>
  		</>
  	);
  };
  ```

  - To control the order of what component shows up on the screen at a specific frame, you can pass a `from` props which tells `Sequence` what frame a particular component should be rendered and to hide it we could pass `durationInFrames` (and both accepts a number)
    <br><br>

  ```typescript
  import {Sequence} from "remotion";

  const MyComponent = () => {
    return (
      <>
        <Sequence from={0} /* from frame 0 */>
          <Component1 />
        </Sequence>
        <Sequence from={5} durationInFrames={6} /* from frame 5 to frame 10 */>
          <Component2 />
        </Sequence>
        <Sequence from={10} /* from frame 10 */>
          <Component3 />
        </Sequence>
      </>
    );
  };
  ```

  On the example above, output will be a video and when played will first show the `<Component1>` then `Component2`, and finally `Component3` but at the same time `Component2` will be unmounted.

  ```
  Frame: 1 ---- 5 ---- 10 - 11 ---- x
         C1     C1     C1 - C1 ...
                C2     C2
                       C3 - C3 ...
  ```

- How to use `interpolate`
  <br><br>

  ```typescript
  import {interpolate, useCurrentFrame} from "remotion";

  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 50] /* from frame 0 to 50 */,
    [0, 1] /* start at opacity 1 to 0 */
  );

  export const Component = () => {
    return (
      <div
        style={{
          opacity,
        }}
      >
        ...
      </div>
    );
  };
  ```

  On the example above, the code will output a `div` component with a `fade-in` effect.
  The animation will start at frame `0` and will end at frame `50`.

- How to use `@remotion/player`
  <br>
  **NOTE :**
  To use this plugin you have to bootstrap a new react app (using something like `vite`, `next`, `cra` or etc.).
  <br>
  To get started with, open the folder that you've just bootstraped and run the command below

  ```
  npm i remotion @remotion/player
  ```

  Next is to create a sample component and place this content

  ```typescript
  export default function Example() {
    return (
      <>
        <Sequence from={0} durationInFrames={15}>
          Hello
        </Sequence>
        <Sequence from={15}>World</Sequence>
      </>
    );
  }
  ```

  Now, go to `app.js` or `index.js` or whatever your app's entrypoint is and paste the snippet below

  ```typescript
  import Example from "~/components/example.tsx";

  export default function App() {
    return (
      <>
        <Player
          component={Example}
          durationInFrames={30 * 100}
          compositionWidth={400}
          compositionHeight={400}
          fps={30}
          controls
        />
      </>
    );
  }
  ```
