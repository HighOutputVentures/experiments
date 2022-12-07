import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import client from "../../config/client";
import IApp from "../../types/app";

type Props = {
  data: IApp;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug?.toString() ?? "";

  const { app: data } = await client.request<{ app: IApp }, { slug: string }>(GetAppDocument, {
    slug,
  });

  if (!data) return { notFound: true };

  return { props: { data } };
};

export default function AppPage({ data }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    import("remote/index").then((mod) => {
      if (ref.current) {
        new mod.default({
          target: ref.current,
          props: { data },
        });
      }
    });
  }, [data]);

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div ref={ref} />
    </>
  );
}

const GetAppDocument = gql`
  query App($slug: String!) {
    app(where: { slug: $slug }, stage: PUBLISHED, locales: [en]) {
      id
      name
      description
      slug
      cover {
        url
        width
        height
      }
    }
  }
`;
