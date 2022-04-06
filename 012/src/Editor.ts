import { Node } from "./Node";

export enum NodeType {
  Editor = 'EDITOR',
  Text = 'TEXT',
}

export class Editor extends Node {
  constructor(private elem: HTMLDivElement) {
    super();
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public serialize(): [] {
    return [];
  }
}