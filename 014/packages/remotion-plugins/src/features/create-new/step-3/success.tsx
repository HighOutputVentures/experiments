import {ArrowNarrowRightIcon} from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import IBirthdayCard from "../../../types/birthday-card";

interface SuccessProps {
  data: IBirthdayCard;
}

export default function Success({data}: SuccessProps) {
  return (
    <div>
      <div className="mx-auto w-fit">
        <Image src="/well-done.svg" alt="" width={200} height={200} />
      </div>

      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-5xl font-black uppercase text-gray-600">Hooray!</h2>
        <p className="mt-2 text-sm font-light">
          Birthday card has been created successfuly.
        </p>

        <Link href={`/videos/${data.id}`} passHref>
          <a className="mt-4 flex items-center gap-3 rounded-sm border border-gray-200 px-4 py-3 text-sm transition-all duration-300 hover:border-gray-300 focus:border-gray-300">
            <span>Watch video now</span>
            <ArrowNarrowRightIcon className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </div>
  );
}
