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

const YOUR_SECRET_KEY = "sk_test_2c6bfa26AW6L89K1f734b2e92ce5";

module.exports = {
  createCheckout: async (c, req, res) => {
    const { cartHash } = req.query;
    console.log(cartHash);

    console.log(req.body);

    if (!cartHash) {
      return res.status(400).json({ error: "Invalid Cart Hash" });
    }

    try {
      const totalPriceResult = await sql`
                SELECT SUM(quantity * price) AS total_price
                FROM carts
                WHERE cart_hash = ${cartHash}
              `;

      const totalPrice = totalPriceResult[0].total_price;

      const yocoPayload = {
        amount: totalPrice,
        currency: "ZAR",
      };

      const yocoApiUrl = "https://payments.yoco.com/api/checkouts";

      const response = await fetch(yocoApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_SECRET_KEY}`,
        },
        body: JSON.stringify(yocoPayload),
      });

      if (response.ok) {
        const responseBody = await response.json();
        const redirect = responseBody.redirectUrl;
        const id = responseBody.id;

        return res.status(200).json({ redirect, id });
      } else {
        const errorData = await yocoApiResponse.json();

        console.error("Yoco API Error:", errorData);

        return res.status(500).json({ error: "Error creating checkout" });
      }
    } catch (error) {
      console.error("An error occurred", error);

      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ success: "checkout created" });
  },

  checkoutWebhook: async (c, req, res) => {
    const requestBody = req.body;
    console.log(req);
    console.log(requestBody);

    const providedSecret = req.headers.authorization.replace("Bearer ", "");
    if (providedSecret !== YOUR_SECRET_KEY) {
      console.error("Invalid secret key");
      return res.status(403).json({ error: "Invalid secret key" });
    }

    return res.status(200).json({ success: "webhook interacted" });
  },
};
