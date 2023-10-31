const cors = require("cors");
const postgres = require("postgres");
const OpenAPIBackend = require("openapi-backend").default;
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const bcrypt = require("bcrypt");
const { createClient } = require("redis");
const cookieParser = require("cookie-parser");
const app = express();
const sql = postgres("postgres://postgres:hahaha@127.0.0.1:8080/rat");
const path = require("path");
const fs = require("fs");

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "SessionStore:",
});

module.exports = {
  updateProduct: async (c, req, res) => {
    const id = c.request.params.productId;

    console.log(id);
  },
  getProducts: async (c, req, res) => {
    const product = await sql`
          select * from products 
          `;
    console.log(product);
    return res.status(200).json({ product });
  },
  getProduct: async (c, req, res) => {
    const product = await sql`
          select * from products where product_id=1
          `;

    const image = await sql`
          select * from images`;
    console.log(image);
    return res.status(200).json({ product, image });
  },
  getProductById: async (c, req, res) => {
    const id = c.request.params.productId;

    const product = await sql`
            select * from products where product_id=${id}
            `;
    return res.status(200).json({ product });
  },

  createProduct: async (c, req, res) => {
    const files = [];

    const { productName, productPrice, productStock, productCategory } =
      req.body.values;

    const imageInfo = req.body.imageInfo;

    const fileName = imageInfo.filename;
    console.log(imageInfo);
    const base64Data = imageInfo.data;
    console.log(base64Data);
    const product = await sql`
        insert into products (product_name, price, stock, category, discount, filename) 
        values (${productName}, ${productPrice}, ${productStock}, ${productCategory},0,${fileName})
      `;

    const image = await sql`
      insert into images (image_data, filename) values (decode(${base64Data},'base64'),${fileName})
      `;
    console.log(image);
    return res.status(200).json({ success: "product created" });
  },
};
