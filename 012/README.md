# Building a custom text editor around Editor.js

## Authors

- [Niel Berongoy](https://app.identifi.com/profile/00a35cf1911edb3eb888abfaad53d3f4)

## Repository

- [git hub repository](https://github.com/HighOutputVentures/highoutput-library)
  @branch hov-neyar

## Goal Statements

We are aiming to create an customizable editor plugin (notion like usage) to integrate mainly in [identifi](https://app.identifi.com/) or other projects; can also adapt to any new feature plugin product team may want to insert; to resolve formatting text concern and to ease building a document type of page.

Engineer Goals:

- add all possible tool/blocks, inline tool and block tune that we can use or the user can use [done]
- try to use react and react dom framework in render method to make development faster and flexible, and so other engineers will have easy time to adapt [in-progress]
- integrate chakra-ui framework to ease customizing the UI [in-progress]
- create our own text plugin (that can do '@' mention and '/' command) [in-progress]
- create our own line tool plugin [to-do]
- create our own block tune plugin [to-do]
- publish it in npm [to-do]
- integrate it in identifi as a beta with a seperate page [to-do]
- create react wrapper to ease implementation in react projects [to-do]

## Abstract

## Conclusion

## Resources

- [Editor.js](https://editorjs.io/base-concepts)
- [Editor.js Plugin Repository](https://github.com/orgs/editor-js/repositories)
- [List of plugins and projects of editor.js](https://github.com/editor-js/awesome-editorjs)
- [Contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [SWC Compiler](https://swc.rs/)
- [Browserify](bundler)
- [tsdx zero config package](https://tsdx.io/)

## Documentation

### Usage

```html
<div id="editor"></div>
```

```typescript
// typescript usage
import { EditorJS, NeyarText } from "@hightoutput/neyar";

const editor = new EditorJS({
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editor",
  tools: {
    neyarText: {
      class: NeyarText,
    },
  },
  defaultBlock: "neyarText",
  /**
   * onReady callback
   */
  onReady: () => {},
  /**
   * onChange callback
   */
  onChange: (api, event) => {
    editor.save().then((outputData) => {
      console.log(outputData);
    });
  },
});
```

### Plugin from Editor.js that we can use

```typescript
// main import
import { EditorJS } from "@hightoutput/neyar";

// plugin from editor js

import {
  Paragraph, // text block base tool
  Header, // header block
  Code, // code text block
  CheckList, // checkbox for todo list block
} from "@hightoutput/neyar";
```
