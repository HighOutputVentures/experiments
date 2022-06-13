import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <body className="min-h-screen bg-white font-sans text-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
