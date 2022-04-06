export enum NodeEvent {
  Drop = 'DROP',
  Exit = 'EXIT'
}

export enum NodeType {
  Editor = 'EDITOR',
  Text = 'TEXT',
}

export abstract class Node extends EventTarget {
  constructor() {
    super();
  }

  public abstract getHTMLElement(): HTMLElement;

  public abstract serialize(): { type: NodeType } & Record<string, unknown>;

  protected onDrop() {
    this.dispatchEvent(new Event(NodeEvent.Drop));
  }

  protected onExit() {
    this.dispatchEvent(new Event(NodeEvent.Exit));
  }
}