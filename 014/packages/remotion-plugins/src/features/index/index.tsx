import {ArrowNarrowRightIcon} from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import birthdayCardService from "../../services/birthday-card";
import IBirthdayCard from "../../types/birthday-card";
import CreateButton from "./create-button";
import Item from "./item";
import Searchbar from "./searchbar";

interface Props {
  data: IBirthdayCard[];
}

export default function Landing({data}: Props) {
  const [items, setItems] = React.useState(data);
  const [search, setSearch] = React.useState("");
  const [deleting, setDeleting] = React.useState<number | null>(null);

  const filtered = items.filter(({celebrant}) =>
    new RegExp(search.trim(), "ig").test(celebrant.name),
  );

  const handleDelete = async (subject: IBirthdayCard) => {
    setDeleting(subject.id);

    try {
      await birthdayCardService.remove(subject.id);
      setItems((o) => o.filter(({id}) => id !== subject.id));
    } catch (error) {
      //
    }
  };

  const shouldShowNoRecords = items.length <= 0;
  const shouldShowNoMatches = items.length >= 1 && filtered.length <= 0;

  const title = "Birthday Card Generator";
  const description =
    "An expirement which uses remotion package to create videos with dynamic data";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@highoutputhq" />
        <meta name="twitter:creator" content="@highoutputhq" />
      </Head>

      <div>
        <main className="">
          <div className="mx-auto max-w-[600px] p-8 lg:p-16">
            <Searchbar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

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
