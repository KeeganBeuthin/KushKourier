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
  
    const limit = 10;

    const page = c.request.params.productId || 1;

    if(page <=0||NaN){
      return res.status(404).json({error:'invalid page'})
      }

    const offset = (page - 1) * limit;
    
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
  getProductsByCategory: async (c, req, res) => {

    const limit = 10;

    const page = c.request.params.page || 1;

    if(page <=0||NaN){
    return res.status(404).json({error:'invalid page'})
    }
    
    const category = c.request.params.category

    const offset = (page - 1) * limit;

    const cat = await sql`
    select category_id from categories where category_name=${category}
    `

    if (cat.length=== 0) {
      return res.status(404).json({ error: "No products found" });
    }

    const catId = cat[0].category_id

    
    
    const productInfo = await sql`
    SELECT
      p.product_id,
      p.product_name,
      p.price,
      p.stock,
      p.discount,
      p.category_id
    FROM products p 
    WHERE category_id=${catId}
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

  getProduct: async (c, req, res) => {
    const name = c.request.params.productName;
    const prod = c.request.params
 


      const productInfo = await sql`
      SELECT
        p.product_id,
        p.product_name,
        p.price,
        p.stock,
        p.discount,
        p.category_id
      FROM products p 
      WHERE product_name=${name}
    `;



      if (productInfo.length === 0) {
        return res.status(404).json({ error: "No product found" });
      }
  
      const product = [];
  
      const productBody = productInfo[0]

        const category = await sql`
        SELECT category_name
        FROM categories
        WHERE category_id = ${productBody.category_id}
      `;
      
  
        const images = await sql`
        SELECT image_data
        FROM images
        WHERE product_id = ${productBody.product_id}
      `;
  
        const productObject = {
          product_id: productBody.product_id,
          product_name: productBody.product_name,
          price: productBody.price,
          stock: productBody.stock,
          discount: productBody.discount,
          category: category[0].category_name,
          image: images.map((image) => image.image_data.toString("base64")),
        };

       

        product.push(productObject);
    
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

    return res.status(200).json({ success: "product created" });
  },
};
