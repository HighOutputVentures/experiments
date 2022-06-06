# Building a custom text editor around Editor.js

## Authors

- [Niel Berongoy](https://app.identifi.com/profile/00a35cf1911edb3eb888abfaad53d3f4)

## Repository

- [git hub repository](https://github.com/HighOutputVentures/highoutput-library/tree/main/packages/neyar)
- [npm package](https://www.npmjs.com/package/@highoutput/neyar)

## Goal Statements

We are aiming to create an customizable editor plugin (notion like usage) to integrate mainly in [identifi](https://app.identifi.com/) or other projects; can also adapt to any new feature plugin product team may want to insert; to resolve formatting text concern and to ease building a document type of page.

### Engineering Goal:

- add all possible [tools and blocks](https://github.com/orgs/editor-js/repositories) that we can use or the user can use

```typescript
import EditorJS from "@editorjs/editorjs";

/** Editor.js Plugin */
import Header from "@editorjs/header";
import Code from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import CheckList from "@editorjs/checklist";
import Qoute from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import ToggleBlock from "editorjs-toggle-block";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import ImageTool from "@editorjs/image";
import SimpleImage from "@editorjs/simple-image";
import Link from "@editorjs/link";
import Attaches from "@editorjs/attaches";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Raw from "@editorjs/raw";

export {
  EditorJS,
  Header,
  Code,
  Paragraph, // default text block
  Qoute,
  Delimiter,
  ToggleBlock,
  List,
  NestedList,
  CheckList,
  ImageTool,
  SimpleImage,
  Link, // link with preview
  Attaches,
  Embed,
  Table,
  Raw,
};

/** Other Library */
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";

export { DragDrop, Undo };

/** Editor.js Inline Tools */
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import LinkAutocomplete from "@editorjs/link-autocomplete";

export { Marker, InlineCode, Underline, LinkAutocomplete };

/** Editor.js block tune tool */
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

export { AlignmentTuneTool };
```

- created our own text plugin class (reference: https://editorjs.io/the-first-plugin)

```typescript
// class file
class NeyarText {
  render() {
    return document.createElement("div"); // render element here
  }
}
```

```typescript
// usage
import { EditorJS, NeyarText } from "@hightoutput/neyar";

const editor = new EditorJS({
  holder: "editor",
  tools: {
    neyarText: {
      class: NeyarText,
    },
  },
  defaultBlock: "neyarText",
});
```

- use of **react** and **reactDOM** framework in render method to make development faster and flexible; coding html in jsx/tsx form is faster rather than doing traditional javascript creating element and use of hook are very handy in manipulating complicated state handling , and so that other front end engineers will have easy time to adapt coding within is project.

```typescript
// *.tsx (file)
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
   * neyar text block is rendered here
   */
  render() {
    const rootNode = document.createElement('div');
    this.nodes.holder = rootNode;

    const root = createRoot(rootNode); // create a react dom with the created div element

    root.render(
      <NeyarTextComponent
        data={this.data.neyarText}
        blockIndex={this.api.blocks.getCurrentBlockIndex() + 1}
        mentions={this.config.mentions || []}
      />
    ); // render react component in from the create react dom

    return this.nodes.holder || ''; // return component rendered
  }
```

- created our own text plugin that can do **'@' mention** to test how customazible the plugin is.

## Abstract

Editor.js by codex team is still a project with an on going development a lot of issues still comes in but despite of that its already usable, although the documents of its usage are straightforward it would still be overwhelming for the developer who come in to explore it with many information, library, plugins and project that we can reuse.

One concern of developing it in front end side is the rendering method, I think it would be an hassle of the developer specially in fast phase developing to build UI manually, luckly I found a way to integrate it with react which make us more comfortable building and styling with it.

Creating our own plugin is a big plus but controls over toolbox and toolblock settings are still to be improve we can add our settings with it but still need to be explore what are the limitations of it.

Inline tool are working altought I found some bugs with, I think it's still fixable within our capability and we could still create our own inline tool.

## Conclusion

In conclusion, I already think that we can use this one and just improve it along the way create our own packages since we had the control over it (already a big plus), we can just coordinate with the codex team if we found some bugs or feature request we might add soon. Drag and drop and Undo feature is working although some improvements can still be made with it.

## Resources

- [editor.js documentation](https://editorjs.io/base-concepts)
- [editor.js repository](https://github.com/orgs/editor-js/repositories)
- [list of plugins and projects of editor.js](https://github.com/editor-js/awesome-editorjs)
- [creating plugin](https://editorjs.io/the-first-plugin)
- [creating a plugin react render sample](https://raw.githubusercontent.com/Walkthroughs/editorjs-react-tool/master/src/tools/timeline/tool.js)[react component](https://raw.githubusercontent.com/Walkthroughs/editorjs-react-tool/master/src/tools/timeline/eventTimeline.js)
- [enabling inline toolbar](https://editorjs.io/enable-inline-toolbar)
- [creating block settings](https://editorjs.io/making-a-block-settings)

- [swc complier](https://swc.rs/)
- [browserify](bundler)
- [tsdx zero config package](https://tsdx.io/)
- [react for component build](https://reactjs.org/)
- [reactDOM to render react inside render method](https://reactjs.org/docs/react-dom.html)
- [ui framework](https://chakra-ui.com/)

- [text cursor location and range of caret](https://javascript.info/selection-range)
- [div position where selection is](https://stackoverflow.com/questions/2031518/javascript-selection-range-coordinates)
- [inserting in text caret position](http://jsfiddle.net/jwvha/1/)
- [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [event target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Usage

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

## Feature request and Support

- ('/' command) [feature request for the codex-team](https://github.com/codex-team/editor.js/issues/2070)
- [markdown format support](https://github.com/codex-team/editor.js/issues/709)
