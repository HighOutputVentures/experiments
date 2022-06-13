import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

export default function Failed() {
  return (
    <div className="text-sm">
      <div className="mx-auto w-fit">
        <Image src="/bug.svg" alt="" width={200} height={200} />
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-5xl font-black uppercase text-gray-600">Ooops!</h2>
        <p className="mt-2 text-sm font-light">
          Something went wrong creating birthday card.
        </p>

        <Link href="/" passHref>
          <a className="mt-4 flex items-center gap-3 rounded-sm border border-gray-200 px-4 py-3 text-sm transition-all duration-300 hover:border-gray-300 focus:border-gray-300">
            <ArrowNarrowLeftIcon className="h-4 w-4" />
            <span>Go to homepage</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
