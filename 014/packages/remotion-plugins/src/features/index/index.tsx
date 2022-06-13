import {ArrowNarrowRightIcon, SearchIcon} from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import birthdayCardService from "../../services/birthday-card";
import IBirthdayCard from "../../types/birthday-card";
import CreateButton from "./create-button";
import Item from "./item";

interface Props {
  data: IBirthdayCard[];
}

export default function Landing({data}: Props) {
  const [items, setItems] = React.useState(data);
  const [search, setSearch] = React.useState("");
  const [deleting, setDeleting] = React.useState<number | null>(null);

  const filtered = items.filter(({celebrant}) =>
    new RegExp(search, "ig").test(celebrant.name),
  );

  const handleDelete = async (subject: IBirthdayCard) => {
    setDeleting(subject.id);

    try {
      await birthdayCardService.remove(subject.id);
      await fetch("/api/revalidate", {
        method: "post",
        body: JSON.stringify({pathname: "/"}),
        headers: {
          "Content-type": "application/json",
        },
      });

      setItems((o) => o.filter(({id}) => id !== subject.id));
    } catch (error) {
      //
    }
  };

  const shouldShowNoRecords = items.length <= 0;
  const shouldShowNoMatches = items.length >= 1 && filtered.length <= 0;

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
              {(shouldShowNoMatches || shouldShowNoRecords) && (
                <div className="mt-16">
                  {shouldShowNoMatches && <NoMatches />}
                  {shouldShowNoRecords && <NoRecords />}
                </div>
              )}

              {filtered.map((birthdayCard) => (
                <Item
                  key={birthdayCard.id}
                  data={birthdayCard}
                  onDelete={handleDelete}
                  loading={deleting === birthdayCard.id}
                />
              ))}
            </div>
          </div>
        </main>

        {items.length >= 1 && <CreateButton />}
      </div>
    </React.Fragment>
  );
}

function NoMatches() {
  return (
    <div>
      <div className="mx-auto w-fit">
        <Image src="/taken.svg" alt="" width={300} height={300} />
      </div>
    </div>
  );
}

function NoRecords() {
  return (
    <div>
      <div className="mx-auto w-fit">
        <Image src="/void.svg" alt="" width={300} height={300} />
      </div>

      <div className="mt-16">
        <Link href="/create-new" passHref>
          <a className="mx-auto flex w-fit items-center gap-3 rounded-sm border border-gray-200 py-3 px-4 transition-all duration-300 hover:border-gray-300 focus:border-gray-300">
            <span className="text-sm">Create new video</span>
            <ArrowNarrowRightIcon className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </div>
  );
}
