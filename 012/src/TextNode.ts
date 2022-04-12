import { Node } from "./Node";
import sanitizeHtml from "sanitize-html";

export class TextNode extends Node {
  private elem: HTMLDivElement;

  constructor(private data: string) {
    super();

    this.elem = document.createElement("div");
    this.elem.contentEditable = "true";
    this.elem.className = "text-node";
    this.elem.innerHTML = data;

    this.updateInnerHtml();

    this.elem.addEventListener("input", this.updateInnerHtml.bind(this));
  }

  private updateInnerHtml(): void {
    let html = this.elem.innerHTML || "";

    // Sanitize:
    html = sanitizeHtml(html, {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
      allowedAttributes: { a: ["href"] }
    });

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

    // Create hyperlinks:
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "<a class='link' href='$2'>$1</a>");

    if (this.elem.innerHTML !== html) {
      const oldTextContent = this.elem.textContent;
      this.elem.innerHTML = html;
      const newTextContent = this.elem.textContent;

      // TODO The code below is meant to reposition the cursor
      // as when we modify innerHTML, it moves.
      //
      // While this does currently work:
      //  (1) it is probably inefficient
      //  (2) it does NOT work in IE (https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify)
      //
      // The "correct" answer probably involves Range
      // but I was unable to get that working.
      // Others, feel free to give it a try --Daniel

      const [longerText, shorterText] =
        oldTextContent.length > newTextContent.length
          ? [oldTextContent, newTextContent] // should always be true (for now)
          : [newTextContent, oldTextContent]

      const shorterTextLength = shorterText.length;
      const longerTextLength = longerText.length;

      let a: number, b: number, c: number;

      // Determine how long util the longer (i.e. old) and
      // shorter (i.e. new) text are the same:
      for (a = 0; a < shorterTextLength; a++) {
        if (longerText[a] !== shorterText[a]) break;
      }

      // Determine how long the longer text
      // stays different from the shorter one:
      for (b = 0; (a+b) < longerTextLength; b++) {
        if (longerText[a+b] === shorterText[a]) break;
      }

      // Determine how long after that the longer and
      // shorter text are the same:
      for (c = 0; (a+c) < shorterTextLength; c++) {
        if (longerText[a+b+c] !== shorterText[a+c]) break;
      }

      const sel = window.getSelection();
      sel.extend(this.elem, 0);
      for (let i = 0; i < (a+c); i++) {
        // @ts-expect-error
        sel.modify('move', 'forward', "character");
      }
    }
  }

  public getHTMLElement(): HTMLElement {
    return this.elem;
  }

  public serialize(): string {
    return this.data;
  }
}
