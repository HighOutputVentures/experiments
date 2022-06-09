import clsx from "clsx";
import Head from "next/head";
import Link, {LinkProps} from "next/link";
import * as React from "react";

export default function Examples() {
  return (
    <React.Fragment>
      <Head>
        <title>examples</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center">
        <nav>
          <ul className="flex w-[300px] flex-col gap-2 text-sm">
            <li>
              <LinkBox href="/examples/remotion-three">@remotion/three</LinkBox>
            </li>
            <li>
              <LinkBox href="/examples/series">
                Series & Series.Sequence
              </LinkBox>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

function LinkBox({
  href,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & Pick<LinkProps, "href">) {
  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          "block rounded-sm border border-gray-200 p-4 font-monospace outline-none transition-colors duration-300 hover:border-gray-300 focus:border-gray-300",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}
