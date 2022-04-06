import { Node, NodeType } from "./Node";

export class Editor extends Node {
  constructor(private elem: HTMLDivElement) {
    super();
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public serialize(): { type: NodeType; } & Record<string, unknown> {
    return {
      type: NodeType.Editor,
      nodes: [],
    };
  }
}