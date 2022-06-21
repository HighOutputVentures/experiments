"use strict";

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin("my-products-plugin")
      .service("myService")
      .getWelcomeMessage();
  },
};
