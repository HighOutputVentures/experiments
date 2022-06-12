import {CheckIcon, DuplicateIcon} from "@heroicons/react/solid";
import clsx from "clsx";
import Image from "next/image";
import * as React from "react";

export default function Item() {
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