import ICelebrant from "./celebrant";
import IMessage from "./message";

export default interface IBirthdayCard {
  id: number;
  celebrant: ICelebrant;
  messages: IMessage[];
  createdAt: string;
}
