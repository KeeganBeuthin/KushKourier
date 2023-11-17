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
  addToCart: async (c, req, res) => {
    const { price, quantity, product_id } = req.body.itemData;

    const cookies = req.headers.cookie || "";

    const match = /cartHash=([^;]+)/.exec(cookies);

    const cartHash = decodeURIComponent(match[1]);

    if (!price || !quantity || !product_id) {
      return res.status(400).json({ error: "Invalid cart item data" });
    }

    try {
      await sql`
              INSERT INTO carts (product_id, quantity, price,cart_hash)
              VALUES (${product_id}, ${quantity}, ${price},${cartHash}) 
            `;
      console.log("added");
      return res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  removeItemFromCart: async (c, req, res) => {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ error: "Invalid user or cart item data" });
    }

    try {
      await sql`
              DELETE FROM carts
              WHERE cart_id = ${item}
            `;
      return res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  updateQuantity: async (c, req, res) => {
    const { user_id, cart_id, new_quantity } = req.body;

    if (!user_id || !cart_id || new_quantity === undefined) {
      return res
        .status(400)
        .json({ error: "Invalid user, cart item, or quantity data" });
    }

    try {
      await sql`
              UPDATE carts
              SET quantity = ${new_quantity}
              WHERE cart_id = ${cart_id} AND user_id = ${user_id}
            `;
      return res.status(200).json({ message: "Cart item quantity updated" });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  getCartContents: async (c, req, res) => {
    const cookies = req.headers.cookie || "";

    const match = /cartHash=([^;]+)/.exec(cookies);

    const cartHash = decodeURIComponent(match[1]);

    if (!cartHash) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const cartInfo = await sql`
        SELECT
          c.cart_id,
          c.product_id,
          c.quantity,
          c.price,
          p.product_name,
          i.image_data
        FROM carts AS c
        INNER JOIN products AS p ON c.product_id = p.product_id
        INNER JOIN images AS i ON c.product_id = i.product_id
        WHERE c.cart_hash = ${cartHash}
      `;

    const cartContents = cartInfo.map((item) => {
      const imageBuffer = item.image_data;
      if (imageBuffer && imageBuffer.length > 0) {
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        return { ...item, image_data: base64Image };
      }
      return item;
    });

    console.log(cartContents);

    return res.status(200).json(cartContents);
  },

  getCartTotalPrice: async (c, req, res) => {
    const { cartHash } = req.query;

    if (!cartHash) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const totalPrice = await sql`
              SELECT SUM(quantity * price) AS total_price
              FROM carts
              WHERE cart_hash = ${cartHash}
            `;
      return res.status(200).json(totalPrice[0]);
    } catch (error) {
      console.error("Error calculating cart total price:", error);
      return res.status(500).json({ error: "Server error" });
    }
  },
  createCart: async (c, req, res) => {
    const cookies = req.headers.cookie;
console.log(cookies)
console.log(req.headers)
    const match = /cartHash=([^;]+)/.exec(cookies);

    const session = req.session.id;

    const sessionData = await redisClient.get(`SessionStore:${session}`);

    const cartHash = decodeURIComponent(match[1]);

    console.log(cartHash);

    if (!sessionData) {
      const cartInsert = await sql`
          insert into carts (cart_hash) values (${cartHash})
          `;
      return res.status(200).json({ success: "cart Created" });
    }

    const id = JSON.parse(sessionData);

    const identifierNum = id.userId[0].user_id;

    const cartInsert = await sql`
          insert into carts (cart_hash,user_id) values (${cartHash},${identifierNum})
          `;
    return res.status(200).json({ success: "cart Created" });
  },
  cartCheck: async (c, req, res) => {
    const productInfo = req;

    const cookies = req.headers.cookie || "";
    const match = /cartHash=([^;]+)/.exec(cookies);

    if (match) {
      const cartHash = decodeURIComponent(match[1]);
      console.log(cartHash);

      const cartCheck = await sql`
        select * from carts where cart_hash=${cartHash}
        `;
      console.log(cartCheck);
      if (cartCheck.length == 0) {
        return res.status(404).json({ error: "no cart found" });
      }
      return res.status(200).json({ success: "cart validated" });
    }
    return res.status(404).json({ error: "no cart found" });
  },

};
