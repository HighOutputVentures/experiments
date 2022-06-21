"use strict";

/**
 *  service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("plugin::my-products-plugin.product");
