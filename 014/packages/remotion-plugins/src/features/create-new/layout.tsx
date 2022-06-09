import {ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import Head from "next/head";
import {useRouter} from "next/router";
import * as React from "react";
import useStore from "../../hooks/use-store";

export default function Layout({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const store = useStore();
  const router = useRouter();

  const handleClick = async () => {
    await router.push("/");

    store.clear();
  };

  return (
    <>
      <Head>
        <title>Create New</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <div className="p-4">
          <button
            className="flex w-fit items-center gap-2 text-sm"
            onClick={handleClick}
          >
            <ArrowNarrowLeftIcon className="h-4 w-4" />
            <span>Go back</span>
          </button>
        </div>

        <main className="flex grow flex-col items-center justify-center">
          <div {...props}>{children}</div>
        </main>
      </div>
    </>
  );
}
