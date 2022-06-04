import {ArrowRightIcon} from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Remotion Expirement</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <main className="flex grow flex-col items-center justify-center">
          <div className="mb-8">
            <Image
              src="/balloons.svg"
              alt=""
              width={300}
              height={400}
              draggable={false}
            />
          </div>

          <Link href="/create-new" passHref>
            <a className="flex items-center gap-4 rounded-md border border-gray-200 p-3 px-5 text-sm outline-none transition-all duration-300 hover:border-gray-300 focus:border-blue-400">
              <span>Create birthday video</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Link>
        </main>
      </div>
    </>
  );
}
