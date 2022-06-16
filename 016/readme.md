## Authors

- [Niel Berongoy](https://app.identifi.com/profile/00a35cf1911edb3eb888abfaad53d3f4)

## Goal Statements

At the end of this experiment, we should be able to create a react ui-framework based from [chakra-ui](https://chakra-ui.com/) that will be applicable with our design system and integrate react storybook for documentation and testing reusable components.

- Phase 1:
  - Explore the created [hov-ui-framework](https://github.com/HighOutputVentures/hov-ui-framework)
  - get the design system theme from the previous build
  - integrate it to our ui framework and export the needed components
  - publish it to npm

## Abstract

## Resources

- [hov-ui-framework](https://github.com/HighOutputVentures/hov-ui-framework)
- [chakra-ui](https://chakra-ui.com/)
- [sample of good storybook](https://streamich.github.io/react-use/?path=/story/components-usekey--demo)
- [introduction in writing docs](https://storybook.js.org/docs/react/writing-docs/introduction)
- [introduction in writing stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [testing library](https://testing-library.com/docs/react-testing-library/intro/)

## Documentation

Workflow for adding components within hov ui framework.

Before creating a new component you must read and follow the [design principles](https://chakra-ui.com/guides/principles) by chakra ui team in order to keep things consistent.

## Getting Started

Folder structure under `src` folder (this is mostly the dev will code) :

```
- src
	- components
	- hooks
	- utils
	- theme
	- index.tsx
```

`components` - under components is where the reusable ui components are save, a file structure is needed in every component that is made.

File structure in every component made (example):

```
- components
	- RadioImage [folder name for component]
		- RadioImage.tsx [reusable component]
		- RadioImage.stories.tsx [storybook component for testing/demo the component]
		- RadioImage.test.tsx [test file]
```

```typescript
// RadioImage.tsx
import React, { FC } from "react";
import { RadioProps, useRadio, chakra, Box, Image } from "@chakra-ui/react";

export interface RadioImageProps extends RadioProps {
  image: string;
  selectColor?: string;
}

const RadioImage: FC<RadioImageProps> = (props) => {
  const { image, selectColor = "green.200", w = 12, ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden data-testid="radio.image.input" />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? selectColor : "transparent"}
        w={w}
        p={1}
        rounded="full"
        data-testid="radio.image.box"
      >
        <Image
          src={image}
          rounded="full"
          {...getLabelProps()}
          data-testid="radio.image.container"
        />
      </Box>
    </chakra.label>
  );
};

export default RadioImage;
```

```typescript
// RadioImage.tsx
import React, { FC } from "react";
import { RadioProps, useRadio, chakra, Box, Image } from "@chakra-ui/react";

export interface RadioImageProps extends RadioProps {
  image: string;
  selectColor?: string;
}

const RadioImage: FC<RadioImageProps> = (props) => {
  const { image, selectColor = "green.200", w = 12, ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden data-testid="radio.image.input" />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? selectColor : "transparent"}
        w={w}
        p={1}
        rounded="full"
        data-testid="radio.image.box"
      >
        <Image
          src={image}
          rounded="full"
          {...getLabelProps()}
          data-testid="radio.image.container"
        />
      </Box>
    </chakra.label>
  );
};

export default RadioImage;
```

```typescript
// RadioImage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RadioImage from "./RadioImage";

describe("Radio Image", () => {
  beforeEach(() => {
    render(
      <RadioImage
        value={"Kat"}
        image={"https://randomuser.me/api/portraits/women/44.jpg"}
      />
    );
  });

  it("should renders radio image box", async () => {
    const radioImageBox = await screen.findAllByTestId("radio.image.box");
    expect(radioImageBox).toHaveLength(1);
  });

  it("should renders radio image container", async () => {
    const radioImageContainer = await screen.findAllByTestId(
      "radio.image.container"
    );
    expect(radioImageContainer).toHaveLength(1);
  });

  it("should contain image src url pass from props", async () => {
    const radioImageContainer = screen.getByTestId("radio.image.container");

    expect(radioImageContainer.getAttribute("src")).toBe(
      "https://randomuser.me/api/portraits/women/44.jpg"
    );
  });

  it("should render radio input value holder", async () => {
    const radioImageInput = await screen.findAllByTestId("radio.image.input");

    expect(radioImageInput).toHaveLength(1);
  });

  it("should contain the value pass from props", async () => {
    const radioImageInput = screen.getByTestId("radio.image.input");
    expect(radioImageInput.getAttribute("value")).toBe("Kat");
  });

  it("should render radio input value holder as hidden", async () => {
    const radioImageInput = screen.getByTestId("radio.image.input");
    expect(radioImageInput).not.toBeVisible();
  });
});
```

after creating all those files you can now import your component into `src/index.tsx` file which would make it available to anyone who use the library

```typescript
//index.tsx
import RadioImage, {
  RadioImageProps,
} from "./components/RadioImage/RadioImage";

export {
  RadioImage,
  RadioImageProps, // note: always include exporting the component props
};
```

`hooks` - this is where the reusable hooks are being saved you can also do export a file from hooks into the `src/index.tsx` file if needed

```typescript
// sample hook
const useSampleHook = () => {
  const save = () => {};
  return {
    save,
  };
};

export default useSampleHook;
```

```typescript
// index.tsx
import useSampleHook './hooks/useSampleHook/useSampleHook';

export { useSampleHook }
```

`utils` - this is where we save the utility function files that our library needed, you can also export this one in the `index.tsx` same as hook if needed only

`theme` - this is where we save the default design system that we setup in our library (user can overide this one)

```
 theme
		- components
		- color.ts
		- index.ts
		- zindex.ts
```

`theme/components` is where we set up default style of chakra ui components if we want to (note: for new component I’m still experimenting of it)

```typescript
// theme/components/button.tsx
import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    _focus: { boxShadow: "none" },
    alignItems: "center",
    alignSelf: "center",
    borderRadius: "4px",
    color: "gray.800",
    outline: "none",
  },
};

export default Button;
```

to know more about component styling please go to this [documentation chakra ui component styling](https://chakra-ui.com/docs/styled-system/theming/component-style)

`colors.ts` - is where we setup are global colors that we can specify and use

```typescript
// color.ts sample only
export const colors = {
  amber: {
    50: "#FFF8E1",
    100: "#FFECB3",
    200: "#FFE082",
    300: "#FFD54F",
    400: "#FFCA28",
    500: "#FFC107",
    600: "#FFB300",
    700: "#FFA000",
    800: "#FF8F00",
    900: "#FF6F00",
  },
};
```

```typescript
// theme/index.ts
import { extendTheme } from "@chakra-ui/react";

import { colors } from "./color";

const theme = extendTheme({
  colors: colors,
});

export default theme;
```

```typescript
// usage
<Button backgroundColor="amber.500" />
```

to know more about theme/color styling please go to this documentation [chakra ui theme](https://chakra-ui.com/docs/styled-system/theming/theme)

## How to run library

To run library, use:

```bash
npm install
npm storybook
```

To test components, use:

```bash
npm test
```

## Usage

To install package, use:

```bash
npm i @highoutput/ui-components
```

To import it into react project:

```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from '@highoutput/ui-components';

const App = () => {
  return (<Provider><div>{...components here}</div><Provider>);
};

ReactDOM.render(<App />, document.getElementById('root'));
```
