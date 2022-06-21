"use strict";

module.exports = ({ strapi }) => ({
  getHelloFromHov() {
    return "Hello from hov 🚀";
  },
  async getProducts(query) {
    return await strapi.entityService.findMany(
      "plugin::my-products-plugin.product",
      query
    );
  },
  async deleteProduct(query) {
    return await strapi.entityService.delete(
      "plugin::my-products-plugin.product",
      query
    );
  },
  async createProduct(query) {
    return await strapi.entityService.create(
      "plugin::my-products-plugin.product",
      query
    );
  },
});
