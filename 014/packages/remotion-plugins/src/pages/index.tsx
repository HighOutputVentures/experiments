import {CheckIcon, DuplicateIcon, SearchIcon} from "@heroicons/react/solid";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";

export default function Landing() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Remotion Expirement</title>
      </Head>

      <div>
        <main className="">
          <div className="mx-auto w-[600px] p-16">
            <div className="flex w-full items-center justify-between rounded-sm border border-gray-200 text-sm">
              <input
                type="text"
                placeholder="Search"
                className="p-3 outline-none"
              />

              <SearchIcon className="mr-4 h-4 w-4 fill-gray-400" />
            </div>

            <div className="mt-16 flex flex-col gap-2">
              <Item />
              <Item />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function Item() {
  const [copied, setCopied] = React.useState(false);

  const SVGIcon = copied ? CheckIcon : DuplicateIcon;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await navigator.clipboard.writeText("http://localhost:3000/videos/<id>");
    setCopied(true);
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (copied) {
      timeout = setTimeout(() => setCopied(false), 3000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [copied]);

  React.useEffect(() => {
    return () => {
      setCopied(false);
    };
  }, []);

  return (
    <a
      href="http://localhost:3000/video/1"
      rel="noreferrer"
      target="_blank"
      className="flex items-center gap-2 border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50"
    >
      <div className="relative h-[48px] w-[48px]">
        <Image src="/robot.svg" alt="" layout="fill" />
      </div>

      <div className="grow">
        <div>John</div>
        <div className="text-xs text-gray-500">Created 3 days ago</div>
      </div>

      <button title="Copy link" onClick={handleClick}>
        <SVGIcon
          className={clsx(
            "h-6 w-6",
            copied && "fill-green-400",
            !copied &&
              "fill-gray-300 transition-all duration-300 hover:fill-gray-400",
          )}
        />
      </button>
    </a>
  );
}
