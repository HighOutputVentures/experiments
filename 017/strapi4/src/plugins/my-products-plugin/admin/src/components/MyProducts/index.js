import React from "react";
import { useQuery } from "react-query";
import { request } from "@strapi/helper-plugin";

function MyProducts() {
  const { isLoading, error, data } = useQuery("getProducts", () =>
    request("/my-products-plugin/getProducts")
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default MyProducts;
