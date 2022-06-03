import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import Link from "next/link";
import * as React from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="p-4">
        <Link href="/" passHref>
          <a className="flex w-fit items-center gap-2 text-sm">
            <ArrowNarrowLeftIcon className="h-4 w-4" />
            <span>Go back</span>
          </a>
        </Link>
      </div>

      <main className="flex grow flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
