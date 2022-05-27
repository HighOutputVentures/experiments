## Remotion

<br>
<br>

**Components/Hooks/Utils**

- `Composition` -
- `Sequence` - Sequence component lets you control what component(s) appear on your video based on the frame.
- `AbsoluteFill` - Automatically centers a component in the screen
- `Img` - A component to be used instead of `img` to ensure that a particular image gets loaded before frame is rendered
- `Audio` - Component to be used when rendering an audio which accepts a lot of useful props
- `Video` -
- `useCurrentFrame` -
- `useVideoConfig` -
- `interpolate` -

<br>
<br>

**How Tos**

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
  import {Sequence} from 'remotion';

  const MyComponent = () => {
  	return (
  		<>
  			<Sequence from={0} /* from frame 0 */>
  				<Component1 />
  			</Sequence>
  			<Sequence from={5} durationInFrames={10} /* from frame 5 to frame 10 */>
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

- How to use `interpolate` - interpolate is used to create effects in zoom. examples of animation could be slide in/out
