import {DownloadIcon, LinkIcon, TrashIcon} from "@heroicons/react/outline";
import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import {Player} from "@remotion/player";
import {differenceInCalendarYears} from "date-fns";
import {GetServerSidePropsContext, GetStaticPropsResult} from "next";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import * as React from "react";
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

interface Props {
  data: IBirthdayCard;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  if (!params?.id) return {notFound: true};

  const data = await birthdayCardService.read.one(params.id);

  if (!data) return {notFound: true};

  return {
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
    setDeleting(false);
    router.push("/");
  };

  const handleCopy = async () => {
    const link = `${constants.hostname}/videos/${data.id}`;

    setCopying(true);

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

  const title = `Happy birthday, ${data.celebrant.name}!`;
  const canonical = `${constants.hostname}/videos/${data.id}`;
  const description = `${differenceInCalendarYears(
    new Date(),
    new Date(data.celebrant.dateOfBirth),
  )} years old`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Birtday Card Generator" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data.celebrant.image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@highoutputhq" />
        <meta name="twitter:creator" content="@highoutputhq" />
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
