import clsx from "clsx";
import Image from "next/image";
import * as React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {v4 as uuid} from "uuid";
import useFileToImgSrc from "../../../hooks/use-file-to-img-src";
import IMessage from "../../../types/message";

interface MessageProps {
  data: IMessage;
}

export default function Message({
  data,
  className,
  ...props
}: MessageProps & Omit<React.ComponentProps<"div">, "children">) {
  const {src} = useFileToImgSrc(data.image);
  const frame = useCurrentFrame();
  const words = data.body.split(" ");

  return (
    <div
      key={uuid()}
      className={clsx(
        className,
        "absolute top-[50%] flex w-[65%] translate-y-[-50%] flex-col gap-[1rem] rounded-md bg-zinc-800 p-6 text-white shadow-md",
      )}
      {...props}
    >
      <div className="flex gap-3">
        <div className="relative h-[40px] w-[40px] shrink-0 grow-0">
          <Image layout="fill" src={src} alt="" />
        </div>

        <div>
          <p className="text-xs text-gray-300 line-clamp-1">
            Greetings from <span className="text-blue-400">@{data.author}</span>
          </p>
          <p>
            {words.map((word, index) => {
              return (
                <span
                  className="mr-1"
                  key={uuid()}
                  style={{
                    opacity: calcOpacity(words, index, frame),
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function calcOpacity(words: string[], index: number, frame: number) {
  const previousWords = words.slice(0, index);
  const totalChars = previousWords.join("").length;
  const duration = totalChars * 0.5;

  return interpolate(frame, [duration, duration + 4], [0, 1]);
}
