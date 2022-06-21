const products = require("./product");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getProducts",
    handler: "products.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/deleteProduct/:id",
    handler: "products.delete",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/createProduct",
    handler: "products.create",
    config: {
      policies: [],
      auth: false,
    },
  },
];
