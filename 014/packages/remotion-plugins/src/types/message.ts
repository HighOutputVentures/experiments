export default interface IMessage {
  id: string;
  body: string;
  author: string;
  /** author's avatar */
  image?: File;
}
