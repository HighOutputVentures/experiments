import { Node } from "./Node";
import { TextNode } from "./TextNode";

export enum NodeType {
  Editor = 'EDITOR',
  Text = 'TEXT',
}

export class Editor extends Node {
  private elem: HTMLDivElement;

  constructor(private htmlElem: HTMLDivElement) {
    super();

    this.elem = htmlElem;
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public appendChild(node: Node): void {
    this.getHTMLElement().appendChild(node.getHTMLElement())
  }

  public appendText(str: string): void {
    this.appendChild(new TextNode(str))
  }

  public serialize(): [] {
    return [];
  }
}
