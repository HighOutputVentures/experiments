import {Player} from "@remotion/player";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import Head from "next/head";
import * as React from "react";
import invariant from "tiny-invariant";
import BirthdayCard from "../../components/birthday-card";
import Spinner from "../../components/spinner";
import constants from "../../config/constants";
import Layout from "../../features/create-new/layout";
import birthdayCardService from "../../services/birthday-card";
import IBirthdayCard from "../../types/birthday-card";

interface Params {
  id: string;
  [key: string]: string | string[];
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const data = await birthdayCardService.read.all();

  const paths = data.map(({id}) => ({params: {id: id.toString()}}));

  return {
    paths,
    fallback: "blocking",
  };
}

interface Props {
  data: IBirthdayCard;
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  invariant(params);
  invariant(params.id);

  const data = await birthdayCardService.read.one(params.id);

  if (!data) return {notFound: true};

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      data,
    },
  };
}

export default function Video({data}: Props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);

    return () => setLoading(true);
  }, []);

  if (loading) return null;

  return (
    <Layout>
      <Head>
        <title>Happy birthday, {data.celebrant.name}!</title>
      </Head>

      {loading && <Spinner />}
      {!loading && (
        <div className="border border-gray-100">
          <Player
            fps={constants.FPS}
            durationInFrames={getDurationInFrames(data.messages.length)}
            component={BirthdayCard}
            compositionWidth={640}
            compositionHeight={640}
            controls
            inputProps={data}
            numberOfSharedAudioTags={0}
          />
        </div>
      )}
    </Layout>
  );
}

export function getDurationInFrames(totalMsg: number) {
  const firstSlideDuration = constants.slideOneDuration * constants.FPS;
  const messageDuration = constants.messageDuration * constants.FPS;
  const lastSlideDuration = constants.lastSlideDuration * constants.FPS;
  return messageDuration * totalMsg + firstSlideDuration + lastSlideDuration;
}
