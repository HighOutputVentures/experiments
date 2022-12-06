import { IProduct, useDebounce, withAuthContext, withCartContext } from "common";
import { gql } from "graphql-request";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { Card } from "../components/card";
import { Header } from "../components/header";
import { Searchbox } from "../components/searchbox";
import client from "../config/client";
import styles from "../styles/index.module.css";

const GetProductsDocument = gql`
  query Products($search: String = "") {
    products(stage: PUBLISHED, locales: [en], where: { _search: $search }) {
      id
      slug
      name
      brand
      price
      stocks
      image {
        url
        width
        height
      }
    }
  }
`;

function Index() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword);

  useEffect(() => {
    setLoading(true);

    client
      .request<{ products: IProduct[] }, { search?: string }>(GetProductsDocument, {
        search: debouncedKeyword,
      })
      .then(({ products }) => {
        setProducts(products);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedKeyword]);

  useEffect(() => {
    return () => {
      setProducts([]);
      setLoading(true);
      setKeyword("");
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Shop</title>
      </Head>

      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <div className={styles.innerWrapper}>
            <Searchbox
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />

            <div className={styles.grid}>
              {products.map((product) => (
                <Card key={product.id} data={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default withAuthContext(withCartContext(Index));
