import { Node } from "./Node";

export class TextNode extends Node {
  private elem: HTMLDivElement;
  public text: string;

  constructor(private data: string) {
    super();

    this.elem = document.createElement("div");
    this.elem.contentEditable = "true";
    this.elem.className = "text-node";

    this.text = data;
    this.setInnerHtmlFromText();

    this.elem.addEventListener("focus", this.setInnerHtmlToText.bind(this));
    this.elem.addEventListener("input", this.setTextToInput.bind(this));
    this.elem.addEventListener("blur", this.setInnerHtmlFromText.bind(this));
  }

  private setInnerHtmlFromText(): void {
    let html = this.text || "";

    // Check if a quote:
    let isAQuote = false;
    if (html.startsWith(">")) {
      isAQuote = true;
      html = html.slice(1);
    }

    // Apply bold:
    html = html.replace(/\*{2}([^\*]+)\*{2}/g, "<span class='bold'>$1</span>");
    html = html.replace(/_{2}([^_]+)_{2}/g, "<span class='bold'>$1</span>");

    // Apply italic:
    html = html.replace(/\*([^\*]+)\*/g, "<span class='italic'>$1</span>");
    html = html.replace(/_([^_]+)_/g, "<span class='italic'>$1</span>");

    // Apply strikethrough:
    html = html.replace(/~~([^~]+)~~/g, "<span class='strikethrough'>$1</span>");

    // Apply code:
    html = html.replace(/`([^\`]+)`/g, "<code class='code'>$1</code>");

    // Apply quote (if needed):
    if (isAQuote) {
      html = `<span class='quote'>${html}</span>`;
    }

    this.elem.innerHTML = html;
  }

  private setInnerHtmlToText(): void {
    this.elem.innerHTML = this.text;
  }

  private setTextToInput(event): void {
    this.text = event.target.textContent;
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public serialize(): string {
    return this.data;
  }
}
