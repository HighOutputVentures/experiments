/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import { BaseHeaderLayout, Layout } from "@strapi/design-system/Layout";
import { Flex } from "@strapi/design-system/Flex";
import Counter from "../../components/Counter";
import Products from "../../components/Products";
import MyProducts from "../../components/MyProducts";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Flex justifyContent="center" alignItem="center">
        <BaseHeaderLayout
          title="My Product List"
          subtitle="This is a test plugin for experiment 017"
          as="h1"
        />
        <Products />
      </Flex>
    </QueryClientProvider>
  );
};

export default memo(HomePage);
