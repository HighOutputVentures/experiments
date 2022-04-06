export enum NodeEvent {
  Drop = 'DROP',
  Exit = 'EXIT'
}

export abstract class Node extends EventTarget {
  constructor() {
    super();
  }

  public abstract getHTMLElement(): HTMLElement;

  public abstract serialize(): unknown;

  protected onDrop() {
    this.dispatchEvent(new Event(NodeEvent.Drop));
  }

  protected onExit() {
    this.dispatchEvent(new Event(NodeEvent.Exit));
  }
}