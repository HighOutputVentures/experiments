import {Player} from "@remotion/player";
import Head from "next/head";
import {useRouter} from "next/router";
import * as React from "react";
import {v4 as uuid} from "uuid";
import BirthdayCard from "~/components/birthday-card";
import Spinner from "~/components/spinner";
import constants from "~/config/constants";
import useFileToImgSrc from "~/hooks/use-file-to-img-src";
import dateFormatter from "~/utils/date-formatter";
import Layout from "../layout";
import useStore from "../use-store";

export default function CreateNewStep3() {
  const store = useStore();
  const router = useRouter();
  const {src: image, loading} = useFileToImgSrc(store.data?.celebrant.image);

  React.useEffect(() => {
    if (!store.data) router.push("/create-new");
  }, [router, store.data]);

  if (!store.data) return null;

  return (
    <Layout>
      <Head>
        {loading && <title>Loading...</title>}
        {!loading && (
          <title>Happy Birthday, {store.data.celebrant.name}!</title>
        )}
      </Head>

      {loading && <Spinner />}
      {!loading && (
        <div className="border border-gray-100">
          <Player
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
      )}
    </Layout>
  );
}
