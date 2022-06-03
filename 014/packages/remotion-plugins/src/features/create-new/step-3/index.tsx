import {Player, PlayerRef} from "@remotion/player";
import {useRouter} from "next/router";
import * as React from "react";
import useCreateCardStore from "~/hooks/use-create-card-store";
import BirthdayCard from "../../../components/birthday-card";
import constants from "../../../config/constants";

export default function CreateNewStep3() {
  const store = useCreateCardStore();
  const router = useRouter();
  const playerRef = React.useRef<PlayerRef>(null);
  const [image, setImage] = React.useState("");

  const createPreview = React.useCallback(() => {
    if (!store.data) return;

    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const src = reader.result;

      if (typeof src === "string") setImage(src);
    });

    reader.readAsDataURL(store.data.celebrant.image);
  }, [store.data]);

  React.useEffect(() => {
    if (!(store.data && store.data.messages.length >= 1))
      router.push("/create-new");

    createPreview();
  }, [createPreview, router, store.data]);

  React.useEffect(() => {
    return () => {
      setImage("");
    };
  }, []);

  if (!store.data) return null;

  return (
    <div>
      <div className="border border-gray-200">
        <Player
          ref={playerRef}
          fps={constants.FPS}
          durationInFrames={constants.FPS * 30}
          component={BirthdayCard}
          compositionWidth={640}
          compositionHeight={640}
          controls
          inputProps={{
            name: store.data.celebrant.name,
            image,
            dateOfBirth: store.data.celebrant.dateOfBirth,
            messages: store.data.messages,
          }}
        />
      </div>
    </div>
  );
}
