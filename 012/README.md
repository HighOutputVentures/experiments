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
- try to use react and react dom framework in render method to make development faster and flexible, and so other engineers will have easy time to adapt [done]
- integrate chakra-ui framework to ease customizing the UI [done]
- create our own text plugin (that can do '@' mention) [done]
- create our own text plugin ('/' command) [in-progress] [feature request for the codex-team](https://github.com/codex-team/editor.js/issues/2070)
- create our own line tool plugin [to-do]
- create our own block tune plugin [to-do]
- publish it in npm [to-do]
- integrate it in identifi as a beta with a seperate page [to-do]

- create react wrapper to ease implementation in react projects [to-do]
- integrate storybook for demo and documentation [to-do]

## Abstract

Editor.js by codex team is still a project with an on going development a lot of issues still comes in but despite of that its already usable, although the documents of its usage are straightforward it would still be overwhelming for the developer who come in to explore it with many information, library, plugins and project that we can reuse.

One concern of developing it in front end side is the rendering method, I think it would be an hassle of the developer specially in fast phase developing to build UI manually, luckly I found a way to integrate it with react which make us more comfortable building and styling with it.

Creating our own plugin is a big plus but controls over toolbox and toolblock settings are still to be improve we can add our settings with it but still need to be explore what are the limitations of it.

Inline tool are working altought I found some bugs with, I think it's still fixable within our capability and we could still create our own inline tool.

## Conclusion

In conclusion, I already think that we can use this one and just improve it along the way create our own packages since we had the control over it (already a big plus), we can just coordinate with the codex team if we found some bugs or feature request we might add soon. Drag and drop and Undo feature is working although some improvements can still be made with it.

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
- [React for component build](https://reactjs.org/)
- [ReactDOM to render react inside render method](https://reactjs.org/docs/react-dom.html)
- [ui framework](https://chakra-ui.com/)
- [react render sample](https://raw.githubusercontent.com/Walkthroughs/editorjs-react-tool/master/src/tools/timeline/tool.js)[react component](https://raw.githubusercontent.com/Walkthroughs/editorjs-react-tool/master/src/tools/timeline/eventTimeline.js)
- [text cursor location and range of caret](https://javascript.info/selection-range)
- [div position where selection is](https://stackoverflow.com/questions/2031518/javascript-selection-range-coordinates)
- [inserting in text caret position](http://jsfiddle.net/jwvha/1/)

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
  Paragraph, // default text block
  Header,
  Code,
  CheckList,
  Qoute,
  Delimiter,
  ToggleBlock,
  List,
  NestedList,
  ImageTool,
  SimpleImage,
  Link, // link with preview
  Attaches,
  Embed,
  Table,
  Raw,

  /** Plugins */
  Undo,
  DragDrop,

  /** Inline tool */
  Marker,
  InlineCode,
  LinkAutocomplete,
  Underline,

  /** Block tune tool */
  AlignmentTuneTool,
} from "@hightoutput/neyar";
```
