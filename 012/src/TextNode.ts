import { Node, NodeType } from "./Node";

export class TextNode extends Node {
  private elem: HTMLDivElement;

  constructor(private data: string) {
    super();

    this.elem = document.createElement("div");
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public serialize(): { type: NodeType; } & Record<string, unknown> {
    return {
      type: NodeType.Text,
      data: this.data,
    };
  }
}