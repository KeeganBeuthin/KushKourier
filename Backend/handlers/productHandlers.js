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
    const productInfo = await sql`
          select * from products where product_id=1
          `;

          const category = await sql`
          select category_name from categories where category_id=1
          `;

          const product = {
            ...productInfo[0],  // Assuming productInfo contains a single product
            category: category[0].category_name,
        };

        
    const image = await sql`
          select image_data from images where product_id=1`;

    console.log(image[0].image_data);

    const imageData = image[0].image_data

 if (image.length > 0) {
    const imageData = image[0].image_data;


    const base64ImageData = imageData.toString('base64');

    return res.status(200).json({ product, base64ImageData });
  } else {
    return res.status(404).json({ error: "Image not found" });
  }

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

    const base64Data = imageInfo.data;

   const category= await sql`
   select category_id from categories where category_name=${productCategory}
   `
  
   const categoryId = category[0].category_id
   console.log(categoryId)
    const product = await sql`
        insert into products (product_name, price, stock, category_id, discount) 
        values (${productName}, ${productPrice}, ${productStock}, ${categoryId},0)
      `;

      const productData = await sql`
      select product_id from products where product_name=${productName}
      `

      const productId = productData[0].product_id
      console.log(productId)

    const image = await sql`
      insert into images (image_data, product_id) values (decode(${base64Data},'base64'),${productId})
      `;

    console.log(image);
    return res.status(200).json({ success: "product created" });
  },
};
