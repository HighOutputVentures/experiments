"use strict";

module.exports = {
  async index(ctx) {
    ctx.body = await strapi
      .plugin("my-products-plugin")
      .service("products")
      .getProducts();
  },
  async delete(ctx) {
    ctx.body = await strapi
      .plugin("my-products-plugin")
      .service("products")
      .deleteProduct(ctx.params.id);
  },
  async create(ctx) {
    ctx.body = await strapi
      .plugin("my-products-plugin")
      .service("products")
      .createProduct(ctx.request.body);
  },
};
