import ICelebrant from "./celebrant";
import IMessage from "./message";

export default interface IBirthdayCard {
  celebrant: ICelebrant;
  messages: IMessage[];
}
