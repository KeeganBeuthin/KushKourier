
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

module.exports ={


    addToCart: async (c, req, res) => {
        const { user_id, product_id, quantity, price } = req.body;
    
        if (!user_id || !product_id || !quantity || !price) {
          return res.status(400).json({ error: "Invalid cart item data" });
        }
    
        try {
          await sql`
              INSERT INTO carts (user_id, product_id, quantity, price)
              VALUES (${user_id}, ${product_id}, ${quantity}, ${price})
            `;
          return res.status(200).json({ message: "Product added to cart" });
        } catch (error) {
          console.error("Error adding product to cart:", error);
          return res.status(500).json({ error: "Server error" });
        }
      },
    
      removeFromCart: async (c, req, res) => {
        const { user_id, cart_id } = req.body;
    
        if (!user_id || !cart_id) {
          return res.status(400).json({ error: "Invalid user or cart item data" });
        }
    
        try {
          await sql`
              DELETE FROM carts
              WHERE cart_id = ${cart_id} AND user_id = ${user_id}
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
        const { user_id } = req.query;
    
        if (!user_id) {
          return res.status(400).json({ error: "Invalid user ID" });
        }
    
        try {
          const cartContents = await sql`
              SELECT cart_id, product_id, quantity, price
              FROM carts
              WHERE user_id = ${user_id}
            `;
          return res.status(200).json(cartContents);
        } catch (error) {
          console.error("Error retrieving cart contents:", error);
          return res.status(500).json({ error: "Server error" });
        }
      },
    
      getCartPrice: async (c, req, res) => {
        const { user_id } = req.query;
    
        if (!user_id) {
          return res.status(400).json({ error: "Invalid user ID" });
        }
    
        try {
          const totalPrice = await sql`
              SELECT SUM(quantity * price) AS total_price
              FROM carts
              WHERE user_id = ${user_id}
            `;
          return res.status(200).json(totalPrice[0]);
        } catch (error) {
          console.error("Error calculating cart total price:", error);
          return res.status(500).json({ error: "Server error" });
        }
      },
}