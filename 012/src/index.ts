import { Editor, NodeType } from './Editor';
import { TextNode } from './TextNode';

export {
  Editor,
  NodeType,
  TextNode
}

const editor = document.querySelector("#editor");
const node = new TextNode("**bold** *italic* ~~strike through~~ ***bold and italic*** **bold and nested _italic_** ");
editor.appendChild(node.getHTMLElement());