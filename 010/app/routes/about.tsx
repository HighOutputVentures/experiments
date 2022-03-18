import { useEffect, useState } from "react";
import { useLoaderData, Link, PrefetchPageLinks } from "remix";

export async function loader() {
  return "about from server";
}

export default function Home() {
  return (
    <h1>
      {JSON.stringify(useLoaderData())}
      <Link to="/home">Home</Link>
      {/* <PrefetchPageLinks page="/about" /> */}
    </h1>
  );
}
