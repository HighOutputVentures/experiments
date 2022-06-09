import {Composition} from "remotion";
import {v4 as uuid} from "uuid";
import BirthdayCard from "../components/birthday-card";
import dateFormatter from "../utils/date-formatter";

export function Video() {
  return (
    <Composition
      id="Video"
      fps={30}
      durationInFrames={30 * 10}
      width={640}
      height={640}
      component={BirthdayCard}
      defaultProps={{
        celebrant: {
          id: uuid(),
          name: "Arjay",
          dateOfBirth: dateFormatter.format(new Date()),
          image: "",
        },
        messages: [
          {
            id: uuid(),
            body: "Lorem ipsum",
            author: "Stella",
          },
        ],
      }}
    />
  );
}
