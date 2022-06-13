import {DownloadIcon, LinkIcon, TrashIcon} from "@heroicons/react/outline";
import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import {Player} from "@remotion/player";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import invariant from "tiny-invariant";
import BirthdayCard from "../../components/birthday-card";
import IconButton from "../../components/icon-button";
import Spinner from "../../components/spinner";
import constants from "../../config/constants";
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
  const [downloading, setDownloading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);

    return () => setLoading(true);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    await birthdayCardService.download(data.id);
    setDownloading(false);
  };

  const handleDelete = () => {
    // TODO
  };

  const handleCopy = () => {
    // TODO
  };

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Happy birthday, {data.celebrant.name}!</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <div className="p-4">
          <Link href="/" passHref>
            <a className="flex w-fit items-center gap-2 text-sm">
              <ArrowNarrowLeftIcon className="h-4 w-4" />
              <span>Go back</span>
            </a>
          </Link>
        </div>

        <main className="flex grow flex-col items-center justify-center p-8">
          {loading && <Spinner />}
          {!loading && (
            <>
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

              <div className="mt-8 flex gap-4">
                <IconButton
                  onClick={handleDownload}
                  icon={DownloadIcon}
                  title="Download video"
                  disabled={downloading}
                />
                <IconButton
                  onClick={handleCopy}
                  icon={LinkIcon}
                  title="Copy video link"
                />
                <IconButton onClick={handleDelete} icon={TrashIcon} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export function getDurationInFrames(totalMsg: number) {
  const firstSlideDuration = constants.slideOneDuration * constants.FPS;
  const messageDuration = constants.messageDuration * constants.FPS;
  const lastSlideDuration = constants.lastSlideDuration * constants.FPS;
  return messageDuration * totalMsg + firstSlideDuration + lastSlideDuration;
}
