import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Error 404 | Page not found</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center font-black text-gray-200">
        <h1 className="text-9xl">404</h1>
      </div>
    </>
  );
}
