import { Node } from "./Node";

export class TextNode extends Node {
  private elem: HTMLDivElement;

  constructor(private data: string) {
    super();

    this.elem = document.createElement("div");
    this.elem.contentEditable = "true";
    this.elem.innerText = data;
  }

  public getHTMLElement(): HTMLElement {
    let text = this.elem.innerText;

    text = text.replace(/\*{2}([^\*]+)\*{2}/g, "<span class='bold'>$1</span>");
    text = text.replace(/`([^\`]+)`/g, "<span class='code'>$1</span>");
    text = text.replace(/\*([^\*]+)\*/g, "<span class='italic'>$1</span>");

    this.elem.innerHTML = text;
    return this.elem;
  }

  public serialize(): string {
    return this.data;
  }
}
