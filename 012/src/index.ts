import { Editor, NodeType } from './Editor';
import { TextNode } from './TextNode';

export {
  Editor,
  NodeType,
  TextNode
}

Object.defineProperties(global, {
  HOVEditor: {
    value: {
      Editor,
      NodeType,
      TextNode,
    },
    writable: false,
    configurable: false,
  }
});
