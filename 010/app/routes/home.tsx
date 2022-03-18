import { useLoaderData } from "remix";
import type { Person, Response } from "../types";
import getPeople from "../services/getPeople";
import useFetch from "../hooks/useFetch";
import List from "../components/list";
import Skeleton from "../components/skeleton";

export async function loader() {
  const response = await getPeople(500);
  return response;
}

export default function Home() {
  const posts = useLoaderData<Response>();
  const [data, isLoading] = useFetch(getPeople, 3000);

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="grid grid-cols-2 gap-[30px] w-[1200px]  align-self-center">
        <div className="p-[20px] flex flex-col justify-center items-center gap-[30px]">
          <p className="text-3xl">SSR</p>
          {posts.pageProps.teamMembers.map((person: Person) => (
            <List
              key={`${person.id}-post`}
              id={person.id}
              sourceUrl={person.featuredImage.node.sourceUrl}
              name={person.attributes.name}
              position={person.attributes.position}
            />
          ))}
        </div>

        <div className=" p-[20px] flex flex-col justify-start items-center gap-[30px]">
          <p className="text-3xl">CSR</p>
          {isLoading && (
            <div className="flex flex-col gap-[30px] w-full">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          )}
          {isLoading === false &&
            data.pageProps.teamMembers.map((person: Person) => (
              <List
                key={`${person.id}-post`}
                id={person.id}
                sourceUrl={person.featuredImage.node.sourceUrl}
                name={person.attributes.name}
                position={person.attributes.position}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
