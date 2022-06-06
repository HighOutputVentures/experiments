import {TrashIcon} from "@heroicons/react/solid";
import Image from "next/image";
import * as React from "react";
import useFileToImgSrc from "~/hooks/use-file-to-img-src";
import {Schema} from "../types";

interface MessageProps {
  data: Schema["messages"][number];
  onDelete?: () => void;
}

export default function Message({data, onDelete}: MessageProps) {
  const {loading, src} = useFileToImgSrc(data.image);

  if (loading) return null;

  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 p-4">
      <div className="relative h-[40px] w-[40px] shrink-0 grow-0">
        <Image layout="fill" src={src} alt="" />
      </div>

      <div className="grow">
        <h3>{data.author}</h3>
        <p className="text-xs line-clamp-1">{data.body}</p>
      </div>

      <button className="group outline-none" onClick={onDelete}>
        <TrashIcon className="h-8 w-8 fill-gray-400 transition-colors duration-300 hover:fill-red-400 group-focus:fill-red-400" />
      </button>
    </div>
  );
}
