import {XIcon} from "@heroicons/react/solid";
import clsx from "clsx";
import {formatDistanceToNow} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Spinner from "../../components/spinner";
import IBirthdayCard from "../../types/birthday-card";

interface ItemProps {
  data: IBirthdayCard;
  onDelete?: (data: IBirthdayCard) => void;
  loading?: boolean;
}

export default function Item({data, onDelete, loading}: ItemProps) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onDelete) onDelete(data);
  };

  return (
    <Link
      href={loading ? "/#" : `http://localhost:3000/videos/${data.id}`}
      passHref
    >
      <a
        className={clsx(
          "relative flex items-center gap-3 border p-4 outline-none transition-all duration-300",
          loading && "border-gray-50",
          !loading &&
            "border-gray-200 hover:border-blue-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50",
        )}
      >
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
          <Spinner className="h-[64px] w-[64px]" />
        </div>

        <div className="relative h-[48px] w-[48px]">
          <Image src={data.celebrant.image} alt="" layout="fill" />
        </div>

        <div className="grow">
          <div>{data.celebrant.name}</div>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(data.createdAt), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </div>
        </div>

        <button onClick={handleDelete} className="group outline-none">
          <XIcon className="h-6 w-6 fill-gray-300 transition-all duration-300 group-hover:fill-gray-400 group-focus:fill-gray-400" />
        </button>
      </a>
    </Link>
  );
}
