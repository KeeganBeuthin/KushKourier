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

    createCheckout: async (c,req,res) => {
   
    },

    checkoutWebhook: async (c,req,res) => {

        const requestBody = req.body;

        console.log(requestBody)
        
        const providedSecret = req.headers.authorization.replace('Bearer ', '');
        if (providedSecret !== YOUR_SECRET_KEY) {
          console.error('Invalid secret key');
          return res.status(403).json({ error: 'Invalid secret key' });
        }
        

        const checkoutIdFromWebhook = requestBody.metadata.checkoutId;


        return res.status(200).json({success: 'webhook interacted'})
    },

}