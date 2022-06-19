import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <body className="min-h-screen bg-white font-sans text-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
