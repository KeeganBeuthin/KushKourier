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
    console.log(req.params);
    console.log(c.request.params.productId)
    const limit = 10;
    const page = c.request.params.productId || 1;
    const offset = (page - 1) * limit;
console.log(offset)
    const productInfo = await sql`
    SELECT
      p.product_id,
      p.product_name,
      p.price,
      p.stock,
      p.discount,
      p.category_id
    FROM products p
    ORDER BY p.product_id
    LIMIT ${limit}
    OFFSET ${offset}
  `;

    if (productInfo.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    const products = [];

    for (const product of productInfo) {
      const category = await sql`
      SELECT category_name
      FROM categories
      WHERE category_id = ${product.category_id}
    `;

      const images = await sql`
      SELECT image_data
      FROM images
      WHERE product_id = ${product.product_id}
    `;

      const productObject = {
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        stock: product.stock,
        discount: product.discount,
        category: category[0].category_name,
        image: images.map((image) => image.image_data.toString("base64")),
      };
      products.push(productObject);
    }

    return res.status(200).json({ products });
  },
  getProductById: async (c, req, res) => {
    const id = c.request.params.productId;
    console.log('hi')

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

    const base64Data = imageInfo.data;

    const category = await sql`
   select category_id from categories where category_name=${productCategory}
   `;

    const categoryId = category[0].category_id;
    console.log(categoryId);
    const product = await sql`
        insert into products (product_name, price, stock, category_id, discount) 
        values (${productName}, ${productPrice}, ${productStock}, ${categoryId},0)
      `;

    const productData = await sql`
      select product_id from products where product_name=${productName}
      `;

    const productId = productData[0].product_id;
    console.log(productId);

    const image = await sql`
      insert into images (image_data, product_id) values (decode(${base64Data},'base64'),${productId})
      `;

    console.log(image);
    return res.status(200).json({ success: "product created" });
  },
};
