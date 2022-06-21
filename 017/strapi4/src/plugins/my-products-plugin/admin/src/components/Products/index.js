import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { request } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import { Flex } from "@strapi/design-system/Flex";
import { TextInput } from "@strapi/design-system/TextInput";
import { Box } from "@strapi/design-system/Box";

import Table from "./Table";

function Products() {
  const queryClient = useQueryClient();

  const [productName, setProductName] = useState("");
  const { isLoading, error, data } = useQuery("getProducts", () =>
    request("/my-products-plugin/getProducts")
  );

  const addProduct = async () => {
    if (!productName.trim()) return;
    await request("/my-products-plugin/createProduct", {
      method: "POST",
      body: {
        data: {
          name: productName,
        },
      },
    });
    queryClient.invalidateQueries("getProducts");
  };

  const onDelete = async (id) => {
    await request(`/my-products-plugin/deleteProduct/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries("getProducts");
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Flex
      justifyContent="start"
      direction="column"
      alignItems="center"
      width="90%"
      gap="20px"
      style={{ minHeight: "100vh" }}
      paddingTop="90px"
      background="neutral0"
    >
      <Flex
        gap="20px"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <TextInput
          placeholder="Enter Product Name"
          aria-label="product-name"
          onChange={(e) => setProductName(e.target.value)}
          width="100%"
        />
        <Button onClick={addProduct}>Add Product</Button>
      </Flex>
      <Box>
        <Table products={data} onDelete={onDelete} />
      </Box>
    </Flex>
  );
}

export default Products;
