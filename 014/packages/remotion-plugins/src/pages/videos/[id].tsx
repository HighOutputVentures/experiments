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
import {useRouter} from "next/router";
import * as React from "react";
import invariant from "tiny-invariant";
import BirthdayCard from "../../components/birthday-card";
import IconButton from "../../components/icon-button";
import Spinner from "../../components/spinner";
import constants from "../../config/constants";
import birthdayCardService from "../../services/birthday-card";
import IBirthdayCard from "../../types/birthday-card";
import revalidatePath from "../../utils/revalidate-path";

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
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [copying, setCopying] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await birthdayCardService.download(data.id);
    setDownloading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await birthdayCardService.remove(data.id);
    await revalidatePath("/");
    setDeleting(false);
    router.push("/");
  };

  const handleCopy = async () => {
    const link = `http://localhost:3000/videos/${data.id}`;

    setCopying(true);

    // need to ensure video exists
    await birthdayCardService.download(data.id, true);

    try {
      await navigator.clipboard.writeText(link);
    } catch (error) {
      // this fails for cases like users leave the page
    }

    setCopying(false);
  };

  React.useEffect(() => {
    setLoading(false);

    return () => {
      setLoading(true);
      setCopying(false);
      setDeleting(false);
      setDownloading(false);
    };
  }, []);

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
              <div className="relative border border-gray-100">
                {downloading && <Loader />}

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
                  disabled={copying}
                />
                <IconButton
                  onClick={handleDelete}
                  icon={TrashIcon}
                  disabled={deleting}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-25">
      <div className="text-sm text-gray-300">
        <Spinner />
        <p>Generating Video. Please wait...</p>
      </div>
    </div>
  );
}

export function getDurationInFrames(totalMsg: number) {
  const firstSlideDuration = constants.slideOneDuration * constants.FPS;
  const messageDuration = constants.messageDuration * constants.FPS;
  const lastSlideDuration = constants.lastSlideDuration * constants.FPS;
  return messageDuration * totalMsg + firstSlideDuration + lastSlideDuration;
}
