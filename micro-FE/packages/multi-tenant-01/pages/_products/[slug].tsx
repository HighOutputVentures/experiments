import { IProduct } from "common";
import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import client from "../../config/client";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug?.toString() ?? "";

  const { product: data } = await client.request<{ product: IProduct }, { slug: string }>(
    GetProductDocument,
    { slug },
  );

  if (!data) return { notFound: true };

  return { props: { data } };
};

export default function Product({ data }: { data: IProduct }) {
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
    <React.Fragment>
      <Head>
        <title>{data.name}</title>
      </Head>
      <div ref={ref} />
    </React.Fragment>
  );
}

const GetProductDocument = gql`
  query Product($slug: String!) {
    product(where: { slug: $slug }, locales: [en], stage: PUBLISHED) {
      id
      slug
      name
      brand
      image {
        url
        width
        height
      }
      price
      stocks
    }
  }
`;
