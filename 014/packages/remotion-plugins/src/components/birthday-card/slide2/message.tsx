import clsx from "clsx";
import Image from "next/image";
import * as React from "react";
import {v4 as uuid} from "uuid";
import IMessage from "~/types/message";

interface MessageProps {
  data: IMessage;
}

export default function Message({
  data,
  className,
  ...props
}: MessageProps & Omit<React.ComponentProps<"div">, "children">) {
  return (
    <div
      key={uuid()}
      className={clsx(
        className,
        "absolute top-[50%] flex w-[65%] translate-y-[-50%] flex-col gap-[1rem] rounded-md bg-zinc-800 p-6 text-white shadow-md",
      )}
      {...props}
    >
      <div className="flex gap-2">
        <div className="relative h-[40px] w-[40px] shrink-0 grow-0">
          <Image layout="fill" src="/robot.svg" alt="" />
        </div>

        <div>
          <p className="text-xs text-gray-300 line-clamp-1">
            Greetings from <span className="text-blue-400">@{data.author}</span>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: data.body,
            }}
          />
        </div>
      </div>
    </div>
  );
}
