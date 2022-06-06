import {Player, PlayerRef} from "@remotion/player";
import Head from "next/head";
import {useRouter} from "next/router";
import * as React from "react";
import {v4 as uuid} from "uuid";
import BirthdayCard from "~/components/birthday-card";
import constants from "~/config/constants";
import useFileToImgSrc from "~/hooks/use-file-to-img-src";
import dateFormatter from "~/utils/date-formatter";
import Layout from "../layout";
import useStore from "../use-store";

export default function CreateNewStep3() {
  const store = useStore();
  const router = useRouter();
  const playerRef = React.useRef<PlayerRef>(null);
  const {src: image, loading} = useFileToImgSrc(store.data?.celebrant.image);

  React.useEffect(() => {
    if (!store.data) router.push("/create-new");
  }, [router, store.data]);

  if (!store.data) return null;

  if (loading) <Loader />;

  return (
    <Layout>
      <Head>
        <title>Happy Birthday, {store.data.celebrant.name}!</title>
      </Head>

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
            messages: store.data.messages,
            celebrant: {
              id: uuid(),
              name: store.data.celebrant.name,
              image,
              dateOfBirth: dateFormatter.format(
                store.data.celebrant.dateOfBirth,
              ),
            },
          }}
        />
      </div>
    </Layout>
  );
}

function Loader() {
  return <div className="p-2 text-sm text-gray-400">Loading...</div>;
}
