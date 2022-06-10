import {SearchIcon} from "@heroicons/react/solid";
import Head from "next/head";
import * as React from "react";
import CreateButton from "./create-button";
import Item from "./item";

export default function Landing() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <React.Fragment>
      <Head>
        <title>Remotion Expirement</title>
      </Head>

      <div>
        <main className="">
          <div className="mx-auto max-w-[600px] p-8 lg:p-16">
            <div className="flex w-full items-center justify-between rounded-sm border border-gray-200 text-sm">
              <input
                type="text"
                placeholder="Search"
                className="p-3 outline-none"
              />

              <SearchIcon className="mr-4 h-4 w-4 fill-gray-400" />
            </div>

            <div className="mt-16 flex flex-col gap-2">
              <Item />
              <Item />
            </div>
          </div>
        </main>

        <CreateButton />
      </div>
    </React.Fragment>
  );
}
