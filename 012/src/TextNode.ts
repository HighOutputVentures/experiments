import { Node } from "./Node";

export class TextNode extends Node {
  private elem: HTMLDivElement;

  constructor(private data: string) {
    super();

    this.elem = document.createElement("div");
    this.elem.contentEditable = "true";
    this.elem.className = "text-node";
    this.elem.innerText = data;
  }

  public getHTMLElement(): HTMLElement {
    let text = this.elem.innerText;

    // Check if a quote:
    let isAQuote = false;
    if (text.startsWith(">")) {
      isAQuote = true;
      text = text.slice(1);
    }

    // Apply bold:
    text = text.replace(/\*{2}([^\*]+)\*{2}/g, "<span class='bold'>$1</span>");
    text = text.replace(/_{2}([^_]+)_{2}/g, "<span class='bold'>$1</span>");

    // Apply italic:
    text = text.replace(/\*([^\*]+)\*/g, "<span class='italic'>$1</span>");
    text = text.replace(/_([^_]+)_/g, "<span class='italic'>$1</span>");

    // Apply strikethrough:
    text = text.replace(/~~([^~]+)~~/g, "<span class='strikethrough'>$1</span>");

    // Apply code:
    text = text.replace(/`([^\`]+)`/g, "<span class='code'>$1</span>");

    // Apply quote (if needed):
    if (isAQuote) {
      text = `<span class='quote'>${text}</span>`;
    }

    this.elem.innerHTML = text;
    return this.elem;
  }

  public serialize(): string {
    return this.data;
  }
}
