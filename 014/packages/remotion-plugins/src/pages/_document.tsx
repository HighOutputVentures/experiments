import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="min-h-screen bg-white font-sans text-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
