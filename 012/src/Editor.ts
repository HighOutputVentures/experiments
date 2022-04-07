import { Node } from "./Node";

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

  public serialize(): [] {
    return [];
  }
}
