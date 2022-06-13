import {PlusIcon, SearchIcon} from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import IBirthdayCard from "../../types/birthday-card";
import CreateButton from "./create-button";
import Item from "./item";

interface Props {
  data: IBirthdayCard[];
}

export default function Landing({data}: Props) {
  const [search, setSearch] = React.useState("");

  const filtered = data.filter(({celebrant}) =>
    new RegExp(search, "ig").test(celebrant.name),
  );

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <SearchIcon className="mr-4 h-4 w-4 fill-gray-400" />
            </div>

            <div className="mt-16 flex flex-col gap-2">
              {data.length <= 0 && <EmptyState />}

              {filtered.map((birthdayCard) => (
                <Item key={birthdayCard.id} data={birthdayCard} />
              ))}
            </div>
          </div>
        </main>

        {data.length >= 1 && <CreateButton />}
      </div>
    </React.Fragment>
  );
}

function EmptyState() {
  return (
    <div>
      <div className="mx-auto w-[350px]">
        <Image
          layout="raw"
          src="/notfound.svg"
          alt=""
          width={350}
          height={350}
        />
      </div>

      <div className="mt-16">
        <Link href="/create-new" passHref>
          <a className="mx-auto flex w-fit items-center gap-1 rounded-sm bg-blue-400 py-3 px-4 text-white shadow-sm">
            <PlusIcon className="h-4 w-4 fill-white" />
            <span className="text-sm">Create new</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
