import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body className="text-white bg-neutral-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
