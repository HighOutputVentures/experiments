"use strict";

/**
 *   controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("plugin::my-products-plugin.product");
